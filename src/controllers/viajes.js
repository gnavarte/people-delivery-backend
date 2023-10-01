import Viaje from "../models/Viajes.js";


export const createViaje = async (req,res) =>{
    try {
        const {choferID, startTimestamp,addressOrigin,addressDestination} = req.body

        const newViaje = new Viaje({
            choferID, 
            startTimestamp,
            addressOrigin,
            addressDestination
        })
        const savedViaje = await newViaje.save();
        res.status(201).json(savedViaje);
    } catch(error){
        restart.status(500).json({error: error.message})
    }
};


export const getViajes = async (req, res) => {
    try {
      const viajes = await Viaje.find();
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
    const viaje = await Viaje.find({choferID:choferID});
    res.status(200).json(viaje);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const assingToChofer = async (req, res) => {
    try {
      const { id } = req.params;
      const {choferID} = req.body;
      const viaje = await Viaje.findByIdAndUpdate(id,{choferID:choferID});
      res.status(200).json(viaje);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const updateViaje = async (req, res) => {
    try {
      const { id } = req.params;
      const newstatus = req.body;
      const viaje = await Viaje.findByIdAndUpdate(id,newstatus);
      res.status(200).json(newstatus);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };