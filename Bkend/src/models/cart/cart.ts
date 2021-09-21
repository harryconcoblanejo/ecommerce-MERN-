import { Schema, model } from "mongoose";
import mongoose from "mongoose";


export interface ICart extends mongoose.Document {
user:String,
cartItems:[{
  product:string,
  quantity:number,
  price:number
}],




}
const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model("Cart ", cartSchema);
