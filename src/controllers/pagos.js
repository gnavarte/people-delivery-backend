import Pagos from "../models/Pagos.js";

// CREATE
export const newPago = async (req, res) => {
  try {
    const { viajeId, choferId, totalPrice } = req.body;

    const pago = new Pagos({
      viajeId,
      choferId,
      totalPrice,
    });

    const savedPago = await pago.save();
    res.status(201).json({ message: "Pago grabado con exito.", savedPago });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//READ
export const getPagos = async (req, res) => {
  try {
    const pagos = await Pagos.find();
    res.status(200).json(pagos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getPagosByIdViaje = async (req, res) => {
  try {
    const { viajeId } = req.params;
    const pago = await Pagos.findOne({ viajeId });
    res.status(200).json(pago);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getPagosByIdChofer = async (req, res) => {
  try {
    const { choferId } = req.params;
    const pagos = await Pagos.find({ choferId });
    res.status(200).json(pagos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
