import mongoose from "mongoose";

const AutoSchema = new mongoose.Schema(
  {
    año: { type: String, required: true },
    dominio: { type: String, required: true },
    motor: { type: Number, required: true },
    marca: { type: String, required: true },
    modelo : { type: String, required: true },
    color: { type: String, required: true },
    chasis : { type: String, required: true },
    fechaVTV: { type: Date, required: true },
    km: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Autos = mongoose.model("Autos", AutoSchema);
export default Autos;
