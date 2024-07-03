import { Controller, Post, Body, Get, Param, Patch, Delete, BadRequestException, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { Api } from 'src/entities/api.entity';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { HeaderService } from './headers/headers.service';
import { ParameterService } from './parameters/parameters.service';
import { ResponseService } from './responses/responses.service';
import { ApiDto } from './dto/api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
  ) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createApiDto: CreateApiDto) {
    return await this.apiService.create(createApiDto);
  }

  @Get('all')
  async findAll() {
    return await this.apiService.findAll();
  }

  @Get()
  async findOne(@Body() id: ApiDto) {
    return await this.apiService.findOne(id);
  }

  @Put('update')
  async update(@Body() updateApiDto: UpdateApiDto) {
    return await this.apiService.update(updateApiDto);
  }

  @Delete('delete')
  async remove(@Body() id: ApiDto) {
    return await this.apiService.remove(id);
  }
}
