// // src/controllers/parameter.controller.ts
// import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
// import { ApiTags, ApiResponse } from '@nestjs/swagger';
// import { ParameterService } from './parameters.service';
// import { CreateParameterDto } from './dto/create-parameter.dto';

// @ApiTags('parameters')
// @Controller('parameters')
// export class ParameterController {
//   constructor(private readonly parameterService: ParameterService) {}

//   @Post('create')
//   @HttpCode(HttpStatus.CREATED)
//   @ApiResponse({ status: HttpStatus.CREATED, description: 'The parameter has been successfully created.' })
//   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
//   create(@Body() createParameterDto: CreateParameterDto, @Param('apiId') apiId: number) {
//     return this.parameterService.create(createParameterDto, apiId);
//   }

//   @Post('')
//   @HttpCode(HttpStatus.OK)
//   @ApiResponse({ status: HttpStatus.OK, description: 'List of parameters.' })
//   @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
//   findAllByApiId(@Param('apiId') apiId: number) {
//     return this.parameterService.findAllByApiId(apiId);
//   }

//   @Post('all')
//   @HttpCode(HttpStatus.OK)
//   @ApiResponse({ status: HttpStatus.OK, description: 'The found parameter.' })
//   @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
//   findOne(@Param('id') id: string) {
//     return this.parameterService.findOne(+id);
//   }

//   @Post('update')
//   @HttpCode(HttpStatus.OK)
//   @ApiResponse({ status: HttpStatus.OK, description: 'The parameter has been successfully updated.' })
//   @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
//   update(@Param('id') id: string, @Body() updateParameterDto: CreateParameterDto) {
//     return this.parameterService.update(+id, updateParameterDto);
//   }

//   @Post('delete')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The parameter has been successfully deleted.' })
//   @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
//   remove(@Param('id') id: string) {
//     return this.parameterService.remove(+id);
//   }
// }
