import * as categoriesControllers from "../controllers/categoriesControllers";
import { Router } from "express";
import { authJwt } from "../middlewares";
import { uploadCategoryImage } from "../models/categories/services/categoryServices";

const router = Router();

router.post(
  "/category/create",
  uploadCategoryImage,
  [authJwt.verifyToken, authJwt.isAdmin],
  categoriesControllers.createCategory
);
router.get(
  "/category/get",

  categoriesControllers.getCategories
);

export default router;
