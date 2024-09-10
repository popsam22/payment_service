import { Router } from "express";
import { createPayment } from "../controller/payment";

const router = Router();

router.post("/", createPayment);

export default router;
