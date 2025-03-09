import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Patch,
  UseInterceptors,
  NotFoundException,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductsService } from 'src/products/services/products/products.service';
import { CreateProductDto } from 'src/products/dto/CreateProductDto.dto';
import { UpdateProductDto } from 'src/products/dto/UpdateProductDto.dto ';
import { CustomSerializerInterceptor } from 'src/products/types/Index';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}


  //search data berdasarkan sebagian match character dari kolom nama
  @Get('search/:name')
  @UseInterceptors(CustomSerializerInterceptor)
  async getCustomer(@Param('name') name: string) {
    const products = await this.productsService.findProductByName(name);
    if (products.length > 0) {
      console.log(products);
      return products;
    } else {
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    }
  }

//search data berdasarkan sebagian match character dari kolom id
  @Get(':id')
  @UseInterceptors(CustomSerializerInterceptor)
  async searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findProductById(id);
    if (product) {
      return product;
    } else {
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    }
  }

  //retrive all data, tapi tidak termasuk yang di delete
  @Get()
  @UseInterceptors(CustomSerializerInterceptor)
  getAllCustomer() {
    return this.productsService.getAllProducts();
  }

   //retrive all data, termasuk yang di delete
  @Get('all/include')
  @UseInterceptors(CustomSerializerInterceptor)
  async getAllProductsIncludingDeleted() {
    return await this.productsService.getAllProductsIncludingDeleted(); 
  }

  //create new data without image
  @Post('create')
  @UseInterceptors(CustomSerializerInterceptor)
  @UsePipes(ValidationPipe)
  createCustomer(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    console.log(createProductDto);

    this.productsService.createProduct(createProductDto);
    if (createProductDto) {
      res.status(HttpStatus.CREATED).send({
        message: `customer ${createProductDto.name} created successfully`,
      });
    }
  }


  //ubah property pada produk berdasaran id
  @Patch('update/:id')
  @UseInterceptors(CustomSerializerInterceptor)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updatedProduct = await this.productsService.updateProduct(
        id,
        updateProductDto,
      );
      return { message: 'Product updated', product: updatedProduct };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  
  //upload property image pada produk berdasaran id menggunakan interceptor gambar dan interceptor response
  @Patch('upload/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, callback) => {

          const uploadPath = join(process.cwd(), 'src', 'products', 'image');
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @UseInterceptors(CustomSerializerInterceptor)
  async uploadProductImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    const imagePath = file.path;
    const updatedProduct = await this.productsService.updateProductImage(
      id,
      imagePath,
    );
    return { message: 'Product image updated', product: updatedProduct };
  }

  //soft delete produk berdasarkan id
  @Delete('delete/:id')
  @UseInterceptors(CustomSerializerInterceptor)
  async softDeleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.softDeleteProduct(id);
    return { message: `Product with ID ${id} has been soft deleted` };
  }

  //restore data berdasarkan id
  @Post('restore/:id')
  @UseInterceptors(CustomSerializerInterceptor)
  async restoreProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.restoreProduct(id);
    return { message: `Product with ID ${id} has been restored` };
  }
}
