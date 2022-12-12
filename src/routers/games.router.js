import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controller.js";
import { createGameValidation } from "../middlewares/createGameValidation.js";


const router = Router();

router.post("/games", createGameValidation, postGame);
router.get("/games", getGames);

export default router;