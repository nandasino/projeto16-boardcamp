import { Router } from "express";
import { postRent , getRentals, closeRentals, deleteRent } from "../controllers/rentals.controller.js";
import { createRentValidation } from "../middlewares/createRentValidation.js";

const router = Router();

router.post("/rentals", createRentValidation, postRent);
router.get("/rentals", getRentals);
router.post("/rentals/:id/return", closeRentals);
router.delete("/rentals/:id", deleteRent);
export default router;