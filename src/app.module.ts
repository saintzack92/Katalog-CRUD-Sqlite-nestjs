import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities, { User } from './typeorm';

import {ConfigModule} from '@nestjs/config';


import { join } from 'path';
import { ProducstModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ProducstModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(process.cwd(), 'database.sqlite'), // Root of project
      entities: entities,
      synchronize: false,
      migrations: ['src/migrations/*.ts'], // Use .ts files for start:dev
      migrationsRun: true,
    }),
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
