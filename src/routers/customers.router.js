import { Router } from "express";
import { getCustomers, postCustomer } from "../controllers/customers.controller.js";
import { createCustomerValidation } from "../middlewares/createCustomerValidation.js";

const router = Router();

router.post("/customers", createCustomerValidation, postCustomer);
router.get("/customers", getCustomers);

export default router;