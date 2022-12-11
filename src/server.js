import express from 'express';
import { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import categoriesRouter from "./routers/categories.router.js";

dotenv.config()

const app = express();
app.use(cors());
app.use(json());
app.use(categoriesRouter)


const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Server running in port ${port}`)); 