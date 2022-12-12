import { Router } from "express";
import { getCustomers, postCustomer, getCustomersById } from "../controllers/customers.controller.js";
import { createCustomerValidation } from "../middlewares/createCustomerValidation.js";

const router = Router();

router.post("/customers", createCustomerValidation, postCustomer);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);

export default router;