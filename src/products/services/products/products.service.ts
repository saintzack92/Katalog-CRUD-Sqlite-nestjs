// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from 'src/typeorm/Product';
import { CreateProductDto } from 'src/products/dto/CreateProductDto.dto';
import { UpdateProductDto } from 'src/products/dto/UpdateProductDto.dto ';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  
  async findProductByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }
  async findProductById(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async createProduct(productDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(productDto);
    return await this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find(); 
  }
  async getAllProductsIncludingDeleted(): Promise<Product[]> {
    return await this.productRepository.find({ withDeleted: true }); 
  }
  
  async softDeleteProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await this.productRepository.softDelete(id); 
  }

  async restoreProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!product) {
      throw new Error('Product not found');
    }
    await this.productRepository.restore(id); 
  }
  
  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // default values for the madeOf object (all properties set to null)
    const defaultMadeOf = {
      chili: null,
      rice: null,
      sugar: null,
      salt: null,
      pepper: null,
      ice: null,
      cream: null,
      milk: null,
      biscuit: null,
      grass: null,
    };

    // Build the new madeOf: override defaults with values provided in updateProductDto.madeOf
    const newMadeOf = updateProductDto.madeOf
      ? { ...defaultMadeOf, ...updateProductDto.madeOf }
      : product.madeOf; // if no madeOf provided, you might choose to keep the existing object

    // Merge update payload with existing product.
    // Note: We overwrite the madeOf property with our merged object.
    const updatedProduct = this.productRepository.create({
      ...product,
      ...updateProductDto,
      madeOf: newMadeOf,
    });

    // Save the updated product to the database
    await this.productRepository.save(updatedProduct);
    return updatedProduct;
  }

  async updateProductImage(id: number, imagePath: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const imageUrl = `/products/uploads/${imagePath.split('\\').pop()}`; 
  
    product.image = imageUrl;
    await this.productRepository.save(product);
    return product;
  }
}
