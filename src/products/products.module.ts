import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsController } from './controllers/customers/products.controller';
import { ProductsService } from './services/products/products.service';
import { ValidateProductMiddleware } from './middleware/validate-product.middleware';
import { ValidateProductAcccountMiddleware } from './middleware/validate-product-account.middleware';
import { NextFunction, Request, Response } from 'express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/Product';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/service/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // Registers the Customer repository
  ],
  controllers: [ProductsController, UploadController],
  providers: [ProductsService, UploadService]
})
export class ProducstModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(ValidateProductMiddleware,ValidateProductAcccountMiddleware,(req:Request,res:Response,next: NextFunction)=>{{
        console.log('last middleware')
        next();
        
      }})
      .forRoutes(
        {
        path:'/products/create',
        method:RequestMethod.POST
      },
        {
        path:'/products/update/:id',
        method:RequestMethod.PATCH
      },
      // ProductsController
      )
  }
}
