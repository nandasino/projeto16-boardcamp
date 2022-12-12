import { db } from "../db.js";
import { customerSchema } from "../models/customers.model.js";

export async function createCustomerValidation(req, res, next){
    const { name, phone, cpf, birthday } = req.body;
    const {error} = customerSchema.validate({ name, phone, cpf, birthday }, {abortEarly: false});
    if(error){
        const errors = error.details.map((detail)=> detail.message)
        return res.status(400).send(errors);
    };
    const cpfExists = await db.query("SELECT * FROM  customers WHERE cpf = $1", [cpf]);
    
    if (cpfExists.rowCount > 0){
        return res.sendStatus(409);
    }

    res.locals.client = { name, phone, cpf, birthday };
    next();
}