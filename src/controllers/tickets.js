import Tickets from '../models/Tickets.js';
import fetch from 'node-fetch'
import sendNewTicketToCore  from '../../integracionConCore.js';

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
    const core = await sendNewTicketToCore(
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
       res.status(500).json({ error: "hubo un error enviando el ticket al equipo core. No se genero un nuevo ticket", core:core});
      }


    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTicket = async (req,res) =>{
  const modifiedDate = new Date(Date.now())
  
  try {
    const {idTicket,newStatus,timestampActualizacion} = req.body;
    const update={
      status: newStatus,
      timestampActualizacion:timestampActualizacion || modifiedDate.toISOString()
    }
    
      const ticket = await Tickets.findOneAndUpdate(
        { idTicket: idTicket },
        { $set: update},
        { new: true }
      );
      if (!ticket) {
        return res.status(404).json({ message: "ticket no encontrado" });
      }
  
      res.status(200).json(ticket);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

