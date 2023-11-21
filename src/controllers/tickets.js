import Tickets from '../models/Tickets.js';
import Usuarios from '../models/Usuarios.js';
import fetch from 'node-fetch'
import sendToCore  from '../../integracionConCore.js';
import mongoose from 'mongoose';
import Counter from '../models/Counter.js';

export const getTickets = async (req, res) => {
  try {
      const { idSolicitante } = req.body;
      const user = await Usuarios.findOne({email: idSolicitante })
      const tickets = await Tickets.find({ idSolicitante: user.idChoferNum }).sort({timestampActualizacion:'desc'});
      
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
      prioridad,
      status,
      detalle
    } = req.body;
    const tipoUsuario = req.body.tipoUsuario || "CHOFER"
    const idTicket = await getNextSequence('idTicket')
    console.log(`idticket: ${idTicket}`)
    var d = new Date();
    d = new Date(d.getTime());
    var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
    

    const ticket = new Tickets({
      idTicket,
      idSolicitante,
      idReclamado,
      idViaje,
      asunto ,
      status,
      prioridad,
      detalle,
      tipoUsuario,
      timestampCreacion: date_format_str
    });
    await ticket.save();
    const core = await sendToCore(
      {
          idTicket,
          idSolicitante,
          idReclamado,
          idViaje,
          asunto ,
          status,
          prioridad,
          detalle,
          tipoUsuario,
          timestampCreacion:date_format_str
      })
      console.log("###")
      console.log(core)
    const coreRes = JSON.parse(core)
      console.log(coreRes)
      if (coreRes["success"]){
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

