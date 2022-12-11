import { db } from "../db.js";
import { categorySchema } from "../models/categories.model.js";

export async function createCategoryValidation(req, res, next){
    const {name} = req.body;
    const {error} = categorySchema.validate({name}, {abortEarly: false});

    if(error){
        const errors = error.details.map((detail)=> detail.message)
        return res.status(400).send(errors);
    }
    
    const categoryExists = await db.query("SELECT * FROM  categories WHERE name = $1", [name]);
    
    if (categoryExists.rowCount > 0){
        return res.sendStatus(409);
    }

    res.locals.name = name;
    next();
}