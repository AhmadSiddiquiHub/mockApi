import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Api } from 'src/entities/api.entity';
import { ParametersModule } from './parameters/parameters.module';
import { ParameterService } from './parameters/parameters.service';
import { Parameter } from 'src/entities/parameter.entity';
import { HeadersModule } from './responses/responses.module';
import { HeaderService } from './headers/headers.service';
import { ResponseService } from './responses/responses.service';
import { Header } from 'src/entities/header.entity';
import { Response } from 'src/entities/response.entity';
import { ResponsesModule } from './headers/headers.module';
// import { ParameterController } from './parameters/parameters.controller';
// import { HeaderController } from './headers/headers.controller';
// import { ResponseController } from './responses/responses.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([Api, Parameter, Header, Response]), ParametersModule, HeadersModule, ResponsesModule],
//   providers: [ApiService, ParameterService, HeaderService, ResponseService,  {
//     provide: APP_PIPE,
//     useClass: ValidationPipe,
//   }],
//   controllers: [ApiController, ParameterController, HeaderController, ResponseController],
// })
// export class ApiModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Api, Parameter, Header, Response]), ParametersModule, HeadersModule, ResponsesModule],
  providers: [ApiService, ParameterService, HeaderService, ResponseService,  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
  controllers: [ApiController],
})
export class ApiModule {}
