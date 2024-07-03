// // src/services/parameter.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Parameter } from 'src/entities/parameter.entity';
// import { CreateParameterDto } from 'src/mock/api/parameters/dto/create-parameter.dto';

// @Injectable()
// export class ParameterService {
//   constructor(
//     @InjectRepository(Parameter)
//     private readonly parameterRepository: Repository<Parameter>,
//   ) {}

//   async create(createParameterDto: CreateParameterDto, apiId: number) {
//     const newParameter = this.parameterRepository.create({
//       ...createParameterDto,
//       api: { id: apiId } as any,
//     });
//     return this.parameterRepository.save(newParameter);
//   }

//   async findAllByApiId(apiId: number) {
//     return this.parameterRepository.find({ where: { api: { id: apiId } } });
//   }

//   async findOne(id: number) {
//     const parameter = await this.parameterRepository.findOne({where: {id}});
//     if (!parameter) {
//       throw new NotFoundException('Parameter not found');
//     }
//     return parameter;
//   }

//   async update(id: number, updateParameterDto: CreateParameterDto) {
//     await this.parameterRepository.update(id, updateParameterDto);
//     return this.parameterRepository.findOne({where: {id}});
//   }

//   async remove(id: number) {
//     const parameter = await this.parameterRepository.findOne({where: {id}});
//     if (!parameter) {
//       throw new NotFoundException('Parameter not found');
//     }
//     await this.parameterRepository.remove(parameter);
//     return parameter;
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parameter } from 'src/entities/parameter.entity';
import { CreateParameterDto } from './dto/create-parameter.dto';

@Injectable()
export class ParameterService {
  constructor(
    @InjectRepository(Parameter)
    private readonly parameterRepository: Repository<Parameter>,
  ) {}

  async create(data: CreateParameterDto): Promise<Parameter> {
    const createdParameter = this.parameterRepository.create(data);
    return await this.parameterRepository.save(createdParameter);
  }

  async findAll(): Promise<Parameter[]> {
    return await this.parameterRepository.find();
  }

  async findOne(id: number): Promise<Parameter> {
    const parameter = await this.parameterRepository.findOne({ where: {id}});
    if (!parameter) {
      throw new NotFoundException(`Parameter with ID ${id} not found`);
    }
    return parameter;
  }

  async update(id: number, data: Partial<Parameter>): Promise<Parameter> {
    await this.findOne(id); // Check if Parameter exists
    await this.parameterRepository.update(id, data);
    return await this.findOne(id); // Return updated Parameter
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Check if Parameter exists
    await this.parameterRepository.delete(id);
  }
}