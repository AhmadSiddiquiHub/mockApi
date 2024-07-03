import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderService } from './headers.service';
// import { HeaderController } from './headers.controller';
import { Header } from 'src/entities/header.entity';
import { Api } from 'src/entities/api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Header, Api])],
  providers: [HeaderService],
  controllers: [],
})
export class ResponsesModule {}
