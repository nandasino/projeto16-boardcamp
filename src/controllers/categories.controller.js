import { db } from '../db.js';

export async function getCategories (req, res){
    try {
        const categories = await db.query('SELECT * FROM categories');
        res.send(categories.rows);
    }catch(error){
        res.sendStatus(500);
    }
}