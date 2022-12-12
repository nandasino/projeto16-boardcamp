import { Router } from "express";
import { postGame } from "../controllers/games.controller.js";
import { createGameValidation } from "../middlewares/createGameValidation.js";


const router = Router();

router.post("/games", createGameValidation, postGame);

export default router;