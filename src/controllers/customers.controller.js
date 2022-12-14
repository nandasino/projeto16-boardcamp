import { db } from '../db.js';

export async function postCustomer(req,res){
    const { name, phone, cpf, birthday } = res.locals.customer;
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

export async function getCustomers(req,res){
    const {cpf} = req.query;

    try{
        if(cpf){
            const filter = await db.query(`
            SELECT 
            id, name, phone, cpf, TO_CHAR(birthday,'yyyy-mm-dd') AS birthday
            FROM 
            customers WHERE cpf LIKE $1;`,
            [`%${cpf}%`]);
            return res.send(filter.rows);
        }
        const customers = await db.query(`
        SELECT 
        id, name, phone, cpf, TO_CHAR(birthday,'yyyy-mm-dd') AS birthday 
        FROM customers;`);
        return res.send(customers.rows);
    }catch(error){
        res.sendStatus(500);
    }
}

export async function getCustomersById(req,res){
    const { id } = req.params;

    try{
        const filterById = await db.query(`SELECT * FROM customers WHERE id = $1;`,[id]);
        if(filterById.rowCount == 0){
            return sessionStorage.sendStatus(404);
        }
        res.send(filterById.rows[0]);
    }catch(error){
        res.sendStatus(500);
    }
}

export async function updateCustomer(req,res){
    const { name, phone, cpf, birthday } = res.locals.client;
    const { id } = req.params;
    try{
        const idExists = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        if (idExists.rowCount== 0){
            return res.sendStatus(400);
        }
        await db.query(`
        UPDATE customers
        SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`,
        [name, phone, cpf, birthday, id]);
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }
}
