import { db } from "../db.js";
import { rentSchema } from "../models/retals.model.js";

export async function createRentValidation(req, res, next){
    const { customerId, gameId, daysRented } = req.body;
    const {error} = rentSchema.validate({ customerId, gameId, daysRented }, {abortEarly: false});
   
    if(error){
        const errors = error.details.map((detail)=> detail.message)
        return res.status(400).send(errors);
    }
    const customerExists = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);

    if (customerExists.rowCount == 0){
        return res.sendStatus(400);
    }

    const gameExists = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);

    if (gameExists.rowCount == 0){
        return res.sendStatus(400);
    }

    const gamesRented = (await db.query(`
    SELECT * 
    FROM rentals 
    WHERE "returnDate" IS null AND "gameId" = $1;`,[gameId])
    ).rows;

    const gameToRent = gameExists.rows[0];

    if (gameToRent.stockTotal == gamesRented.length){
        return res.sendStatus(400);
        console.log("jogo sem estoque");
    }

    res.locals.rent = { customerId, gameId, daysRented };
    res.locals.game = gameToRent;
    next();
}