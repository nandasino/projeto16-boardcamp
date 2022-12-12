import express from 'express';
import { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import categoriesRouter from "./routers/categories.router.js";
import gamesRouter from "./routers/games.router.js"
import customerRouter from "./routers/customers.router.js"
import rentRouter from "./routers/retals.router.js"

dotenv.config()

const app = express();
app.use(cors());
app.use(json());
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customerRouter);
app.use(rentRouter);


const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Server running in port ${port}`)); 
