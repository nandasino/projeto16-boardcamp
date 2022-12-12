import { db } from '../db.js';
import dayjs from "dayjs";

export async function postRent(req,res){
    const { customerId, gameId, daysRented } = res.locals.rent;
    const gameToRent = res.locals.game;
    try{
        await db.query(`
            INSERT INTO rentals 
            ("customerId", "gameId", "rentDate", "daysRented",
            "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [
              customerId,
              gameId,
              dayjs().format("YYYY-MM-DD"),
              daysRented,
              null,
              gameToRent.pricePerDay * daysRented,
              null,
            ]
          );
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }
}