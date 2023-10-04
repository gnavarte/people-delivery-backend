import mongoose from "mongoose";

//AGREGAR CALIFICACION CHOFER

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    genre: {
      type: String,
      required: true,
      max: 1,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      requried: true,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
    rate: [{ type: Number, min: 1, max: 5 }],
    driverLic: String,
    carInformation: {
      carBrand: String,
      carModel: String,
      carColor: String,
      carPlate: String,
      carInsurance: String,
      carRegistration: String,
      carPicturePath: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
