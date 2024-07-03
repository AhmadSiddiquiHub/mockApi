// // src/services/response.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Response } from 'src/entities/response.entity';
// import { CreateResponseDto } from './dto/create-response.dto';
// import { Api } from 'src/entities/api.entity';

// @Injectable()
// export class ResponseService {
//   constructor(
//     @InjectRepository(Response)
//     private readonly responseRepository: Repository<Response>,
//     @InjectRepository(Api)
//     private readonly apiRepository: Repository<Api>,
//   ) {}

//   // async create(createResponseDto: CreateResponseDto): Promise<Response> {
//   //   const api = await this.apiRepository.findOneBy({ id: createResponseDto.apiId });
//   //   const response = this.responseRepository.create({ ...createResponseDto, api });
//   //   return this.responseRepository.save(response);
//   // }

//   findAll(): Promise<Response[]> {
//     return this.responseRepository.find({ relations: ['api'] });
//   }

//   findOne(id: number): Promise<Response> {
//     return this.responseRepository.findOne({ where: { id }, relations: ['api'] });
//   }

//   async update(id: number, updateResponseDto: Partial<CreateResponseDto>): Promise<Response> {
//     await this.responseRepository.update(id, updateResponseDto);
//     return this.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.responseRepository.delete(id);
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'src/entities/response.entity';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
  ) {}

  async create(data: CreateResponseDto): Promise<Response> {
    const createdResponse = this.responseRepository.create(data);
    return await this.responseRepository.save(createdResponse);
  }

  async findAll(): Promise<Response[]> {
    return await this.responseRepository.find();
  }

  async findOne(id: number): Promise<Response> {
    const response = await this.responseRepository.findOne({ where: {id}});
    if (!response) {
      throw new NotFoundException(`Response with ID ${id} not found`);
    }
    return response;
  }

  async update(id: number, data: Partial<Response>): Promise<Response> {
    await this.findOne(id); // Check if Response exists
    await this.responseRepository.update(id, data);
    return await this.findOne(id); // Return updated Response
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Check if Response exists
    await this.responseRepository.delete(id);
  }
}