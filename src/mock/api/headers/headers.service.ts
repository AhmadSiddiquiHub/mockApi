// src/services/header.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Header } from 'src/entities/header.entity';
// import { HeaderDto } from './dto/create-header.dto';
// import { Api } from 'src/entities/api.entity';

// @Injectable()
// export class HeaderService {
//   constructor(
//     @InjectRepository(Header)
//     private readonly headerRepository: Repository<Header>,
//     @InjectRepository(Api)
//     private readonly apiRepository: Repository<Api>,
//   ) {}

//   async create(apiId: number = 1, headersDto: HeaderDto[]): Promise<{ message: string, data: Header[] }> {
//     try {
//       const api = await this.apiRepository.findOneBy({ id: apiId });
//       if (!api) {
//         throw new Error('API not found');
//       }
      
//       const headers = headersDto.map(headerDto => this.headerRepository.create({ ...headerDto, api }));
//       const headersSaved = await this.headerRepository.save(headers);
//       if (!headersSaved) {
//         throw new Error('Headers not created');
//       }
//       return { message: 'Headers created successfully', data: headersSaved };
//     } catch (error) {
//       return { message: error.message, data: [] };
//     }
//   }

  // async findAll(): Promise<{ message: string, data: Header[] }> {
  //   const headers = await this.headerRepository.find({ relations: ['api'] });
  //   return { message: 'Headers retrieved successfully', data: headers };
  // }

  // async findOne(id: number): Promise<{ message: string, data: Header }> {
  //   const header = await this.headerRepository.findOne({ where: { id }, relations: ['api'] });
  //   if (!header) {
  //     throw new NotFoundException('Header not found');
  //   }
  //   return { message: 'Header retrieved successfully', data: header };
  // }

  // async update(id: number, updateHeaderDto: UpdateHeaderDto): Promise<{ message: string, data: Header }> {
  //   await this.headerRepository.update(id, updateHeaderDto);
  //   const updatedHeader = await this.findOne(id);
  //   return { message: 'Header updated successfully', data: updatedHeader.data };
  // }

  // async remove(id: number): Promise<{ message: string }> {
  //   await this.headerRepository.delete(id);
  //   return { message: 'Header deleted successfully' };
  // }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Header } from 'src/entities/header.entity';
import { CreateHeaderDto } from './dto/create-header.dto';

@Injectable()
export class HeaderService {
  constructor(
    @InjectRepository(Header)
    private readonly headerRepository: Repository<Header>,
  ) {}

  async create(data: CreateHeaderDto): Promise<Header> {
    const createdHeader = this.headerRepository.create(data);
    return await this.headerRepository.save(createdHeader);
  }

  async findAll(): Promise<Header[]> {
    return await this.headerRepository.find();
  }

  async findOne(id: number): Promise<Header> {
    const header = await this.headerRepository.findOne({ where: {id}});
    if (!header) {
      throw new NotFoundException(`Header with ID ${id} not found`);
    }
    return header;
  }

  async update(id: number, data: Partial<Header>): Promise<Header> {
    await this.findOne(id); // Check if Header exists
    await this.headerRepository.update(id, data);
    return await this.findOne(id); // Return updated Header
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Check if Header exists
    await this.headerRepository.delete(id);
  }
}