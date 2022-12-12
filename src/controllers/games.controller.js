import { db } from '../db.js';

export async function postGame(req,res){
    const {name, image, stockTotal, categoryId, pricePerDay} = res.locals.game;
    try{
        await db.query(
        `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5);`,
        [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }
}

export async function getGames(req,res){
    try{
        const games = await db.query(`
        SELECT 
        games.*,
        categories.name as "categoryName"
        FROM 
        games JOIN categories 
        ON 
        games."categoryId" = categories.id;`
        );
        res.send(games.rows);
    }catch(error){
        res.sendStatus(500);
    }
}