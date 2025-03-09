import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DataSource } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './typeorm/Session';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';
console.log('Database path:', join(__dirname, 'database.sqlite'));
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get<DataSource>(DataSource);
  const sessionRepository = dataSource.getRepository(SessionEntity);
  app.enableCors({
    origin: 'http://localhost:3001', 
    methods: 'GET,PUT,POST,DELETE, PATCH',
    allowedHeaders: 'Content-Type, Accept,Authorization',
    credentials: true,
  });
  console.log('Database path:', join(__dirname, 'database.sqlite'));
  app.use(session({
    name: 'nestjssession',
    secret: 'SuperSecretSessionKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: new TypeormStore().connect(sessionRepository),
    rolling:true
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );app.use('/products/uploads', express.static(join(process.cwd(), 'src', 'products', 'image')));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  const server = app.getHttpServer();
  server.setTimeout(10 * 60 * 100); 

  
  await app.listen(3000);
}

bootstrap();
