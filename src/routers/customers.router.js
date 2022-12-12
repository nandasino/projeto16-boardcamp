import { Router } from "express";
import { postCustomer } from "../controllers/customers.controller.js";
import { createCustomerValidation } from "../middlewares/createCustomerValidation.js";

const router = Router();

router.post("/customers", createCustomerValidation, postCustomer);

export default router;