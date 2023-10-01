import mongoose from "mongoose";

const PagosSchema = new mongoose.Schema(
  {
    viajeId: { type: String, required: true },
    choferId: { type: String, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Pagos = mongoose.model("Pagos", PagosSchema);
export default Pagos;
