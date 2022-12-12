import { db } from '../db.js';

export async function postCustomer(req,res){
    const { name, phone, cpf, birthday } = res.locals.client;
    try{
        await db.query(
        `INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4);`,
        [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }
}