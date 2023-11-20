import mongoose from "mongoose";

const ViajeSchema = new mongoose.Schema(
  {
    choferID: {
      type: Number,
      required: true,
    },
    viajeID: {
      type: Number,
      required: true,
    },
    pasajeroID: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Looking for driver",
      //looking for driver -> driver assigned -> in progress -> finished
    },
    startTimestamp: {
      type: Date,
    },
    //test
    finishTimestamp: {
      type: Date,
    },
    duration_sec: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
    },
    addressOrigin: {
      streetName: String,
      number: String,
      postalCode: String,
      localidad: String,
      province: String,
    },
    addressDestination: {
      streetName: String,
      number: String,
      postalCode: String,
      localidad: String,
      province: String,
    },
    totalPrice: {
      type: Number,
    },
    valoracion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Viaje = mongoose.model("Viaje", ViajeSchema);
export default Viaje;
