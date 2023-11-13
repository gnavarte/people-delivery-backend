import { sendClosedTripToCore } from "../../integracionConCore.js";
import Viaje from "../models/Viajes.js";

export const createViaje = async (req, res) => {
  try {
    const {
      choferID,
      startTimestamp,
      addressOrigin,
      addressDestination,
      totalPrice,
      valoracion,
    } = req.body;

<<<<<<< HEAD
    const newViaje = new Viaje({
      choferID,
      startTimestamp,
      addressOrigin,
      addressDestination,
      totalPrice,
      valoracion,
    });
    const savedViaje = await newViaje.save();
    res.status(201).json(savedViaje);
  } catch (error) {
    restart.status(500).json({ error: error.message });
  }
=======
export const createViaje = async (req,res) =>{
    try {
        const {choferID, startTimestamp,addressOrigin,addressDestination,totalPrice,valoracion} = req.body

        const newViaje = new Viaje({
            choferID, 
            startTimestamp,
            addressOrigin,
            addressDestination,
            totalPrice,
            valoracion,
            duration_sec

        })
        const savedViaje = await newViaje.save();
        res.status(201).json(savedViaje);
    } catch(error){
        restart.status(500).json({error: error.message})
    }
>>>>>>> 0769958f4d12104945cc85a9c6c59f4db39a3a37
};

export const getViajes = async (req, res) => {
  try {
    const { email } = req.body;
    const viajes = await Viaje.find({ choferID: email });
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
    const { newStatus } = req.body;
    const viaje = await Viaje.findByIdAndUpdate(
      id,
      { status: newStatus.toLowerCase() },
      { new: true }
    );

    res.status(200).json(viaje);

    if (viaje.status.toLowerCase() === "closed") {
      const closed_trip = {
        viaje_id: "",
        status: "closed",
        finishTimestamp: new Date(Date.now()).toLocaleString(),
      };

      console.log(closed_trip);
      const res = await sendClosedTripToCore(closed_trip);
      console.log(res)
    } else {
      console.log("NEW STATUS: ", viaje.status);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
