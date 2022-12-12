import { Router } from "express";
import { postRent } from "../controllers/rentals.controller.js";
import { createRentValidation } from "../middlewares/createRentValidation.js";

const router = Router();

router.post("/rentals", createRentValidation, postRent);

export default router;