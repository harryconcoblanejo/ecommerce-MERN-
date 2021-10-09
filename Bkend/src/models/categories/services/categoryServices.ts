import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";
import Category from "../../../models/categories/category";
import multer from "../../../middlewares/multer";

export const uploadCategoryImage = multer.array("categoryImage");

export const removeImages = async (req: Request) => {
  const category_Remove = await Category.findById(req.params.id);
  const numberOfImages = category_Remove.categoryImage.length;

  for (let i = 0; i < numberOfImages; i++) {
    const pathsToDeleteImages = category_Remove.productImage[i].path;
    fs.unlink(path.resolve(pathsToDeleteImages));
  }
};
