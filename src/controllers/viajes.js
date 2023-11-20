import { sendClosedTripToCore } from "../../integracionConCore.js";
import Viaje from "../models/Viajes.js";

export const createViaje = async (req, res) => {
  try {
    const {
      choferID,
      viajeID,
      pasajeroID,
      startTimestamp,
      addressOrigin,
      addressDestination,
      totalPrice,
      valoracion,
      duration_sec,
    } = req.body;

    const newViaje = new Viaje({
      choferID,
      viajeID,
      pasajeroID,
      startTimestamp,
      addressOrigin,
      addressDestination,
      totalPrice,
      valoracion,
      duration_sec,
    });

    console.log(newViaje);
    const savedViaje = await newViaje.save();
    res.status(201).json(savedViaje);
  } catch (error) {
    restart.status(500).json({ error: error.message });
  }
};

export const getViajes = async (req, res) => {
  try {
    const { email } = req.body;
    const viajes = await Viaje.find({ email: email });
    res.status(200).json(viajes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getViajeByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Viaje.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getViajesByChoferId = async (req, res) => {
  try {
    const { choferID } = req.params;
    const viaje = await Viaje.find({ choferID: choferID });
    res.status(200).json(viaje);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const assingToChofer = async (req, res) => {
  try {
    const { id } = req.params;
    const { choferID } = req.body;
    const viaje = await Viaje.findByIdAndUpdate(id, { choferID: choferID });
    res.status(200).json(viaje);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus, idViaje } = req.body;
    console.log(newStatus, idViaje);
    // const viaje = await Viaje.findByIdAndUpdate(
    //   id,
    //   { status: newStatus.toLowerCase() },
    //   { new: true }
    // );

    // res.status(200).json(viaje);

    // if (viaje.status.toLowerCase() === "closed") {
    //   const closed_trip = {
    //     viaje_id: "111",
    //     // viaje_id: idViaje,
    //     status: "closed",
    //     finishTimestamp: new Date(Date.now()).toLocaleString(),
    //   };

    //   console.log(closed_trip);
    //   const res = await sendClosedTripToCore(closed_trip);
    //   console.log(res);
    // } else {
    //   console.log("NEW STATUS: ", viaje.status);
    // }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
