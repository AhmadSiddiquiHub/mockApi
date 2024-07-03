import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from 'src/entities/response.entity';
import { ResponseService } from './responses.service';
// import { ResponseController } from './responses.controller';
import { Api } from 'src/entities/api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response, Api])],
  providers: [ResponseService],
  controllers: [],
})
export class HeadersModule {}
