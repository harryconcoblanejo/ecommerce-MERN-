import { initialData } from "../../controllers/admin/initialData";
import { Router } from "express";
const router = Router();

router.post("/initialData", initialData);

export default router;
