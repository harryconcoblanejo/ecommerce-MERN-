import Category from "../../models/categories/category";
import Product from "../../models/products/products";

import { RequestHandler } from "express";

export const initialData: RequestHandler = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({}).exec();

  res.status(200).json({
    categories,
    products,
  });
};
