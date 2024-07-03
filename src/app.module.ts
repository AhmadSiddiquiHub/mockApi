import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './mock/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config/database/db.database';

@Module({
  imports: [TypeOrmModule.forRoot(config), ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
