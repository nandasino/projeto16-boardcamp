import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config()

const { Pool }= pkg;
const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const app = express();

app.get('/categories', async (req, res)=>{
    try {
        const categories = await connection.query('SELECT * FROM categories');
        res.send(categories.rows);
    }catch(error){
        res.sendStatus(500);
    }
})

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Server running in port ${port}`)); 
