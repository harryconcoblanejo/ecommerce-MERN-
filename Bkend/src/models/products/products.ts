
import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
productName:string,
slug:string,
desccription:string,
productImages:[],
price:number,
category:string,
countInStock:number,
reviews:[],
createdBy:{},
}


  



const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    slug:{
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    productImages:{
        type:[{}],
        required:true,
       
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    category:{
      type: Schema.Types.ObjectId, ref:'Category',required:true,
    
    },
    countInStock:{
      type: Number,
      required: true
    },
    reviews:[
      {
        type:Schema.Types.ObjectId, 
        ref:'User',
        review:String
      }
    ],
    createdBy:{type:Schema.Types.ObjectId, ref:'User',required:true },
    updatedAt:Date

    // createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }
);

export default model("Product ", productSchema);
