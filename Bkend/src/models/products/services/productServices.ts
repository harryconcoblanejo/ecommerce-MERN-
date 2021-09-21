import { Request, Response } from 'express';
import path from "path";
import fs from "fs-extra";
import Product from "../../../models/products/products";
import multer from '../../../middlewares/multer';




export const upload = multer.array('productImages');

export const removeImages = async (req:Request) => {

  const productToUpdate_Remove = await Product.findById(req.params.id);
  const numberOfImages = productToUpdate_Remove.productImages.length;

  for (let i = 0; i < numberOfImages; i++) {
    const pathsToDeleteImages = productToUpdate_Remove.productImages[i].path;
    fs.unlink(path.resolve(pathsToDeleteImages));
  }
};
