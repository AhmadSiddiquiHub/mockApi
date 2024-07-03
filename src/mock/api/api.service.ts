import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from 'src/entities/api.entity';
import { HeaderService } from './headers/headers.service';
import { ParameterService } from './parameters/parameters.service';
import { ResponseService } from './responses/responses.service';
import { CreateApiDto } from './dto/create-api.dto';
import { CreateHeaderDto } from './headers/dto/create-header.dto';
import { CreateParameterDto } from './parameters/dto/create-parameter.dto';
import { CreateResponseDto } from './responses/dto/create-response.dto';
import { ApiDto } from './dto/api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Api)
    private readonly apiRepository: Repository<Api>,
    private readonly headerService: HeaderService,
    private readonly parameterService: ParameterService,
    private readonly responseService: ResponseService,
  ) {}

  async create(data: CreateApiDto): Promise<Api> {
    const { headers, parameters, responses, ...apiData } = data;

    const defaultResponses = responses.filter(response => response.markDefault);
    if (defaultResponses.length !== 1) {
      throw new BadRequestException('Exactly one response should be marked as makeDefault');
    }

    const createdApi = this.apiRepository.create(apiData);
    const savedApi = await this.apiRepository.save(createdApi);
console.log("Saved: ", savedApi);
if (!savedApi.id) {
  throw new Error('Failed to save API and obtain its ID');
}

console.log('Saved API ID:', savedApi.id);

await Promise.all(
  headers.map(header => {
    const headerData: CreateHeaderDto & { apiId: number } = { ...header, apiId: savedApi.id };
    console.log('Creating header with apiId:', headerData.apiId);
    return this.headerService.create(headerData);
  }),
);

    await Promise.all(
      parameters.map(parameter =>
        this.parameterService.create({ ...parameter, apiId: savedApi?.id } as CreateParameterDto),
      ),
    );

    await Promise.all(
      responses.map(response =>
        this.responseService.create({ ...response, apiId: savedApi?.id } as CreateResponseDto),
      ),
    );

    return savedApi;
  }

  async findAll(): Promise<Api[]> {
    return await this.apiRepository.find({ relations: ['headers', 'parameters', 'responses'] });
  }

  async findOne(apiDto: ApiDto): Promise<Api> {
    const api = await this.apiRepository.findOne({
      where: { id: apiDto.id },
      relations: ['headers', 'parameters', 'responses'],
    });
    if (!api) {
      throw new NotFoundException(`API with ID ${apiDto.id} not found`);
    }
    return api;
  }

  async update(data: UpdateApiDto): Promise<Api> {
    const { id, name, httpMethod, endpoint, headers, parameters, responses } = data;

    // Check if API exists
    const api = await this.apiRepository.findOne({
      where: { id },
      relations: ['headers', 'parameters', 'responses'],
    });
    if (!api) {
      throw new NotFoundException(`API with ID ${id} not found`);
    }

    // Update API entity
    api.name = name;
    api.httpMethod = httpMethod;
    api.endpoint = endpoint;

    // Update associated headers
    if (headers && headers.length > 0) {
      api.headers = await Promise.all(headers.map(header => this.updateOrCreateEntity(this.headerService, header)));
    }

    // Update associated parameters
    if (parameters && parameters.length > 0) {
      api.parameters = await Promise.all(parameters.map(param => this.updateOrCreateEntity(this.parameterService, param)));
    }

    // Update associated responses
    if (responses && responses.length > 0) {
      api.responses = await Promise.all(responses.map(resp => this.updateOrCreateEntity(this.responseService, resp)));
    }

    // Save updated API entity
    await this.apiRepository.save(api);

    // Return updated API
    return api;
  }

  private async updateOrCreateEntity(service: any, entityData: any): Promise<any> {
    const { id } = entityData;
    if (id) {
      // Update existing entity
      await service.update(id, entityData);
      return entityData;
    } else {
      // Create new entity
      return service.create(entityData);
    }
  }

  async remove(apiDto: ApiDto): Promise<{ message: string }> {
    try {
      const {id} = apiDto;
      const api = await this.findOne({id});
      if (!api) {
        throw new NotFoundException(`API with ID ${id} not found`);
      }
      await this.apiRepository.delete({id: api.id});
      return { message: `API with ID ${id} and its related records deleted successfully` };
    } catch (error) {
      // Handle specific errors here if needed
      throw new Error(`Failed to delete API: ${error.message}`);
    }
  }
}
