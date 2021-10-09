import { RequestHandler } from "express";
import Category, { ICategory } from "../models/categories/category";
import slugify from "slugify";

function createCategories(categories: any, parentId: any = null): any {
  const categoryList = [];
  let category;

  if (parentId == null) {
    category = categories.filter((cat: any) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat: any) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      categoryImage: cate.categoryImage,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const slug = slugify(name);
    const categoryImage = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | Express.Multer.File[]
      | undefined;
    const category: ICategory = new Category({
      name,
      parentId,
      slug,
      categoryImage,
    });
    const savedCategory = await category.save();
    res.json(savedCategory);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export const getCategories: RequestHandler = async (req, res) => {
  try {
    const categoriesFound = await Category.find({});

    // const parentId = req.body.parentId

    if (!categoriesFound)
      return res.status(404).json({ message: "category not exist" });

    if (categoriesFound) {
      const categoriesList = createCategories(categoriesFound);

      return res.json({
        message: "?this is a list of categories",
        categoriesList,
      });
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
