import * as categoriesControllers from "../controllers/categoriesControllers";
import { Router } from "express";
import { authJwt } from "../middlewares";

const router = Router();

router.post(
  "/category/create",
  [authJwt.verifyToken, authJwt.isAdmin],
  categoriesControllers.createCategory
);
router.get("/category/get", categoriesControllers.getCategories);

export default router;
