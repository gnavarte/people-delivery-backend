import Autos from '../models/Autos.js';

export const newAuto = async (req, res) => {
  try {
    const {
      año,
      dominio,
      motor,
      marca,
      modelo,
      color,
      chasis,
      fechaVTV,
      km,
      email,
    } = req.body;

    const auto = new Autos({
      año,
      dominio,
      motor,
      marca,
      modelo,
      color,
      chasis,
      fechaVTV,
      km,
      email,
    });

    await auto.save();

    res.status(201).json({ message: 'Auto creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAutos = async (req, res) => {
    try {
        const { email } = req.body;
        const autos = await Autos.find({ email: email });
        res.status(200).json(autos);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
    };

