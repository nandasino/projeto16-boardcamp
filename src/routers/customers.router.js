import { Router } from "express";
import { getCustomers, postCustomer, getCustomersById, updateCustomer } from "../controllers/customers.controller.js";
import { createCustomerValidation } from "../middlewares/createCustomerValidation.js";

const router = Router();

router.post("/customers", createCustomerValidation, postCustomer);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.put("/customers/:id", createCustomerValidation, updateCustomer);

export default router;