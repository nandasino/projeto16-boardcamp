import { Router } from "express";
import { postRent , getRentals } from "../controllers/rentals.controller.js";
import { createRentValidation } from "../middlewares/createRentValidation.js";

const router = Router();

router.post("/rentals", createRentValidation, postRent);
router.get("/rentals", getRentals)
export default router;