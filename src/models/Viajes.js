import mongoose from "mongoose";

const ViajeSchema = new mongoose.Schema(
  {
    choferID:
    {
        type: String,
        required: true,
    },
    status:{
        type:String,
        default: 'Looking for driver'
        //looking for driver -> driver assigned -> in progress -> finished
    },
    startTimestamp: {
      type: Date
    },

    finishTimestamp:{
        type:Date
    },
    duration_sec: {
      type: Number,
      default:0
    },
    addressOrigin: {
      streetName: String,
      number: String,
      postalCode: String,
      localidad:String
    },
    addressDestination: {
        streetName: String,
        number: String,
        postalCode: String,
        localidad:String
    },
    totalPrice:{
        type: Number,
    },
    valoracion: {
      type: Number,
      default:0
    },
  },
  {
    timestamps: true,
  }
);

const Viaje = mongoose.model("Viaje", ViajeSchema);
export default Viaje;