import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop()
  description: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
