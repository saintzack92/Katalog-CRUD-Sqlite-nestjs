import { IsNotEmpty, IsNumber, IsString, MinLength, MaxLength, ValidateNested, IsOptional, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { CreateProductMadeOfDto } from "./CreateProductMadeOf.dto";

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string;
  
    @IsNumber()
    price: number;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @ValidateNested()
    @Type(() => CreateProductMadeOfDto)
    madeOf: CreateProductMadeOfDto;


    @IsString()
    @IsOptional()
    image?: string;

    
  }