import { RequestHandler } from "express";
import Product, { IProduct } from "../models/products/products";
import User from "../models/users/user";
import slugify from "slugify";
// import path from "path";
// import fs from "fs-extra";

import { removeImages } from "../models/products/services/productServices";

export const home: RequestHandler = async (req, res) => {
  return res.json("home page");
};

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json({ message: "products....", products });
  } catch (error) {
    res.json(error);
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  try {
    const productFound = await Product.findById(req.params.id);
    if (!productFound) return res.status(204).json();

    return res.json(productFound);
  } catch (error) {
    // res.json(error.message);
    console.log(error);
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);

    const productImages = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | Express.Multer.File[]
      | undefined;

    const { productName, description, price, category, countInStock } =
      req.body;

    const product: IProduct = new Product({
      productName,
      slug: slugify(productName),
      description,
      price,
      category,
      countInStock,
      createdBy: user,
      // en la ruta post pongo id del usuario, no se si esta bien pero
      // x ahora funciona
      productImages,
    });

    const savedProduct = await product.save();

    res.json(savedProduct);
  } catch (error) {
    res.send(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    removeImages(req);

    const productDeleted = await Product.findByIdAndDelete(req.params.id);

    if (!productDeleted) return res.status(204).json();
    return res.json({ message: "this product was deleted", productDeleted });
  } catch (error) {
    // res.json(error.message);
    console.log(error);
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    removeImages(req);

    const productImages = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const modify = {
      productName: req.body.productName,
      slug: req.body.slug,
      desciption: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      productImages,
      category: req.body.category,
      createdBy: req.body.user._id,
    };

    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, modify, {
      new: true,
    });

    if (!updatedProduct) return res.status(204).json();
    return res.json({ message: "Successfully updated", updatedProduct });
  } catch (error) {
    res.json(error);
  }
};
