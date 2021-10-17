// import { truncate } from "fs-extra";
import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug?: string;
  parentId?: string;
  children?: string;
  categoryImage?: any[];
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
    },
    categoryImage: {
      type: [{}],
      required: true,
    },
    children: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ICategory>("Category", categorySchema);
