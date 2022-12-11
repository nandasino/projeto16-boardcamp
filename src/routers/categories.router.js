import { Router } from "express";
import { getCategories , postCategory} from "../controllers/categories.controller.js";
import { createCategoryValidation } from "../middlewares/createCategoryValidation.js";


const router = Router();

router.get("/categories", getCategories);
router.post("/categories", createCategoryValidation, postCategory);

export default router;