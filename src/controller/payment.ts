import Payment from "../models/payment";
import { Request, Response } from "express";
import axios from "axios";

export async function createPayment(req: Request, res: Response) {
  const authToken = req.header("Authorization");
  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized to make payment" });
  }
  try {
    const data = await axios.get("http://localhost:3000/api/v1/user/auth", {
      headers: {
        Authorization: authToken,
      },
    });
    const { _id } = data.data.user;
    const { totalAmount, paymentMethod } = req.body;
    if (!totalAmount || !paymentMethod) {
      return res.status(404).json({ message: "Cannot make payment" });
    }
    const payment = new Payment({
      userId: _id,
      totalAmount,
      paymentMethod,
      paymentStatus: "pending",
    });
    await payment.save();
    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json(error);
  }
}
