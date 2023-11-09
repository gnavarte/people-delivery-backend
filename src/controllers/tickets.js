import Tickets from '../models/Tickets.js';
import fetch from 'node-fetch'
import sendToCore  from '../../integracionConCore.js';

export const getTickets = async (req, res) => {
  try {
      const { idSolicitante } = req.body;
      const tickets = await Tickets.find({ idSolicitante: idSolicitante });
      
      res.status(200).json(tickets);
      
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
  };
export const newTicket = async (req, res) => {
  try {
    const {
      idSolicitante,
      idReclamado,
      idViaje,
      asunto ,
      detalle
    } = req.body;

    const ticket = new Tickets({
      idSolicitante,
      idReclamado,
      idViaje,
      asunto ,
      detalle
    });
    const core = await sendToCore(
      {idSolicitante,
      idReclamado,
      idViaje,
      asunto ,
      detalle})
      console.log(core)
    //checkeo si se envio bien al equipo de core
      if (core.success){
          await ticket.save();
          res.status(201).json({ message: 'ticket creado con éxito'});
      }
      else{
       res.status(500).json({ error: "hubo un error enviando el ticket al equipo core", core:core});
      }


    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTicket = async (req,res) =>{
  try {
    const {} = req.body;
    //TODO



  } catch (error) {
    
  }
}

