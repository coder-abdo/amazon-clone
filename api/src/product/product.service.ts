import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly product: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.product(createProductDto);
    return newProduct.save();
  }
  async findAll(): Promise<Product[]> {
    const products = await this.product.find().exec();
    return products;
  }
  async find(id: string): Promise<Product> {
    const product = await this.product.findById(id).exec();
    return product;
  }
  async update(id: string, updateDto: UpdateProductDto) {
    const existedProduct = await this.find(id);
    const { name, price, description } = existedProduct;
    existedProduct.name = updateDto.name ?? name;
    existedProduct.price = updateDto.price ?? price;
    existedProduct.description = updateDto.description ?? description;
    await existedProduct.save();
  }
  async delete(id: string) {
    await this.product.deleteOne({ _id: id });
  }
}
