import { db } from "../db.js";
import { gameSchema } from "../models/games.model.js";

export async function createGameValidation(req, res, next){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    const {error} = gameSchema.validate({name, image, stockTotal, categoryId, pricePerDay}, {abortEarly: false});

    if(error){
        const errors = error.details.map((detail)=> detail.message)
        return res.status(400).send(errors);
    }

    const categoryExists = await db.query("SELECT * FROM categories WHERE id = $1;", [categoryId]);
    
    if (categoryExists.rowCount = 0){
        return res.sendStatus(400);
    }

    const nameExists= await db.query("SELECT * FROM games WHERE name = $1;", [name]);

    if (nameExists.rowCount > 0){
        return res.sendStatus(409);
    }

    next();
}