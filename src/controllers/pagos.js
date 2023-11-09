import { sendGeneratedBillToCore } from "../../integracionConCore.js";
import Pagos from "../models/Pagos.js";
import Viajes from "../models/Viajes.js";

// CREATE
export const newPago = async (req, res) => {
  try {
    const { viajeId } = req.body;

    const viaje = await Viajes.findById(viajeId);

    console.log(viaje);

    const bill_generated = {
      distance: viaje.distance,
      origen: viaje.addressOrigin,
      destino: viaje.addressDestination,
      fechaViaje: viaje.startTimestamp,
      conceptos: [
        {
          concepto: "",
          monto: viaje.totalPrice,
        },
      ],
      chofer: viaje.choferID,
      // pasajero: viaje.pasajeroID,  -->  VER COMO OBTNER
      // idViaje: viaje.viajeID,      -->  VER COMO OBTENER
    };

    const pago = new Pagos({
      viajeId,
      choferId: viaje.choferID,
      totalPrice: viaje.totalPrice,
    });

    const savedPago = await pago.save();

    if (savedPago) {
      try {
        console.log(bill_generated)
        const res = await sendGeneratedBillToCore(bill_generated);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    res.status(201).json({ message: "Pago grabado con exito.", savedPago });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//READ
export const getPagos = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const pagos = await Pagos.find({ choferId: email });
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
