import Tickets from '../models/Tickets.js';
import fetch from 'node-fetch'
import getToken  from '../../tokenCore.js';

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
    //checkeo si se envio bien al equipo de core
      //if (core.status = 200){
          //await ticket.save();
          res.status(201).json({ message: 'ticket creado con éxito',res:core});
      // }
      // else{
      //  res.status(500).json({ error: "hubo un error enviando el ticket al equipo core"});
      // }


    
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

async function sendToCore(newTicket) {
  const core_endpoint = process.env.TEST_ENDPOINT
  const responseToken= await getToken()

  const t = {
    exchage:"new_driver_tickets",
    message:newTicket
  }
  const response = await fetch(core_endpoint, {
    method: "POST",
    body: JSON.stringify(t),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": responseToken.token //ver como refrescar y poner el token aca
    }
  }).then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  const res = await response
  return res
}

