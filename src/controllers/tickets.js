import Tickets from '../models/Tickets.js';
import fetch from 'node-fetch'
import sendToCore  from '../../integracionConCore.js';
import mongoose from 'mongoose';
import Counter from '../models/Counter.js';

export const getTickets = async (req, res) => {
  try {
      const { idSolicitante } = req.body;
      const tickets = await Tickets.find({ idSolicitante: idSolicitante }).sort({timestampActualizacion:'desc'});
      
      res.status(200).json(tickets);
      
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
  };
  
  async function getNextSequence(name) {
    var ret = await Counter.findOneAndUpdate(         
            { name: name },
            {
              $inc:{ seq: 1 }
            },
            {new: true}
           
    )
  return ret.seq
  }
export const newTicket = async (req, res) => {
  try {
    const {
      idSolicitante,
      idReclamado,
      idViaje,
      asunto ,
      detalle
    } = req.body;
    const TipoUsuario = req.body.TipoUsuario || "CHOFER"
    const idTicket = await getNextSequence('idTicket')
    console.log(`idticket: ${idTicket}`)
    const ticket = new Tickets({
      idTicket,
      idSolicitante,
      idReclamado,
      idViaje,
      asunto ,
      detalle,
      TipoUsuario
    });
    await ticket.save();
    // const core = await sendToCore(
    //   {idSolicitante,
    //   idReclamado,
    //   idViaje,
    //   asunto ,
    //   detalle,
    //   TipoUsuario})
    //   console.log("###")
    //   console.log(core)
    // const coreRes = JSON.parse(core)
    //checkeo si se envio bien al equipo de core

      if (ticket){
          res.status(201).json({ message: 'ticket creado con éxito', ticket:ticket});
      }
      else{
       res.status(500).json({ error: "hubo un error enviando el ticket al equipo core", core:core});
      }


    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTicket = async (req,res) =>{
  const modifiedDate = new Date(Date.now())
  try{
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

