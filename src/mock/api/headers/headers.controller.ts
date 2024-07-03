// import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// import { HeaderService } from './headers.service';
// import { HeaderDto } from './dto/create-header.dto';
// import { Header } from 'src/entities/header.entity';

// @Controller('headers')
// export class HeaderController {
//   constructor(private readonly headerService: HeaderService) {}

//   @Post('ceate')
//    async create(
//     @Param('apiId') apiId: number,
//     @Body() headers: HeaderDto[]
//   ): Promise<{ message: string, data: Header[] }> {
//     return this.headerService.create(apiId, headers);
//   }

//   // @Post('all')
//   // findAll(): Promise<{ message: string, data: Header[] }> {
//   //   return this.headerService.findAll();
//   // }

//   // @Post()
//   // findOne(@Param('id') id: number): Promise<{ message: string, data: Header }> {
//   //   return this.headerService.findOne(id);
//   // }

//   // @Post('update')
//   // update(@Param('id') id: number, @Body() updateHeaderDto: UpdateHeaderDto): Promise<{ message: string, data: Header }> {
//   //   return this.headerService.update(id, updateHeaderDto);
//   // }

//   // @Post('delete')
//   // remove(@Param('id') id: number): Promise<{ message: string }> {
//   //   return this.headerService.remove(id);
//   // }
// }
