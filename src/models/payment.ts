import { Document, model, Schema } from "mongoose";

interface IPayment extends Document {
  userId: string;
  totalAmount: number;
  paymentStatus: "success" | "failure" | "pending";
  paymentMethod: string;
}

const paymentSchema = new Schema<IPayment>({
  userId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["success", "failure", "pending"],
    required: true,
  },
  paymentMethod: { type: String, required: true },
});

const Payment = model<IPayment>("Payment", paymentSchema);
export default Payment;
