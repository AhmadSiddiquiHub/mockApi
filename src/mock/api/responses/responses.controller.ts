// // src/controllers/response.controller.ts
// import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
// import { ResponseService } from '../responses/responses.service';
// import {CreateResponseDto} from './dto/create-response.dto';
// import { Response } from 'src/entities/response.entity';

// @Controller('responses')
// export class ResponseController {
//   constructor(private readonly responseService: ResponseService) {}

//   // @Post()
//   // create(@Body() createResponseDto: CreateResponseDto): Promise<Response> {
//   //   return this.responseService.create(createResponseDto);
//   // }

//   @Get()
//   findAll(): Promise<Response[]> {
//     return this.responseService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: number): Promise<Response> {
//     return this.responseService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: number, @Body() updateResponseDto: Partial<CreateResponseDto>): Promise<Response> {
//     return this.responseService.update(id, updateResponseDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: number): Promise<void> {
//     return this.responseService.remove(id);
//   }
// }