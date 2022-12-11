import { db } from '../db.js';

export async function getCategories (req, res){
    try {
        const categories = await db.query('SELECT * FROM categories');
        res.send(categories.rows);
    }catch(error){
        res.sendStatus(500);
    }
}

export async function postCategory(req, res){
    const { name } = res.locals;
    try{
        await db.query("INSERT INTO categories (name) VALUES ($1)",[name]);
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }
}