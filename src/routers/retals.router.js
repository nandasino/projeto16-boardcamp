import { Router } from "express";
import { postRent , getRentals, closeRentals } from "../controllers/rentals.controller.js";
import { createRentValidation } from "../middlewares/createRentValidation.js";

const router = Router();

router.post("/rentals", createRentValidation, postRent);
router.get("/rentals", getRentals);
router.post("/rentals/:id/return", closeRentals);
export default router;