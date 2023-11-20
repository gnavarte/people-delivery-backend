import { sendGeneratedBillToCore } from "../../integracionConCore.js";
import Pagos from "../models/Pagos.js";
import Viajes from "../models/Viajes.js";

// CREATE

export const newPago = async (req, res) => {
  try {
    const { viajeId } = req.body;

    const viaje = await Viajes.findById(viajeId);

    // console.log(viaje);

    const bill_generated = {
      // distance: viaje.distance || "",
      km: 123,
      // origen: viaje.addressOrigin,
      origen: {
        calle: viaje.addressOrigin.streetName,
        numero: viaje.addressOrigin.number,
        localidad: viaje.addressOrigin.localidad,
        provincia: viaje.addressOrigin.provincia || "",
      },
      destino: {
        calle: viaje.addressDestination.streetName,
        numero: viaje.addressDestination.number,
        localidad: viaje.addressDestination.localidad,
        provincia: viaje.addressDestination.provincia || "",
      },
      fechaViaje: viaje.startTimestamp,
      conceptos: [
        {
          concepto: "VIAJE",
          monto: viaje.totalPrice,
        },
      ],
      // chofer: viaje.choferID,
      chofer: "64fd10669bd9b570faa7b1c3",
      // pasajero: viaje.pasajeroID || "18",
      // idViaje: viaje.viajeID || "18",
      idViaje: 100,
      pasajero: 18,
    };

    console.log(bill_generated);

    const pago = new Pagos({
      viajeId,
      choferId: viaje.choferID,
      totalPrice: viaje.totalPrice,
    });

    const savedPago = await pago.save();

    if (savedPago) {
      try {
        console.log(bill_generated);
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
