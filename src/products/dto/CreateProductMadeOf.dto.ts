import { IsString, IsOptional } from "class-validator";

export class CreateProductMadeOfDto {
  @IsString()
  @IsOptional()
  chili?: string;

  @IsString()
  @IsOptional()
  rice?: string;

  @IsString()
  @IsOptional()
  sugar?: string;

  @IsString()
  @IsOptional()
  salt?: string;                          

  @IsString()
  @IsOptional()
  pepper?: string;

  @IsString()
  @IsOptional()
  ice?: string;

  @IsString()
  @IsOptional()
  cream?: string;

  @IsString()
  @IsOptional()
  milk?: string;

  @IsString()
  @IsOptional() 
  biscuit?: string;

  @IsString()
  @IsOptional()
  grass?: string;

}
