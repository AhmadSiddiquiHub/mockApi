import { Module } from '@nestjs/common';
import { ParameterService } from './parameters.service';
// import { ParameterController } from './parameters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parameter } from 'src/entities/parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter])],
  providers: [ParameterService],
  controllers: [],
})
export class ParametersModule {}
