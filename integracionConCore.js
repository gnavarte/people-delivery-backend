import fetch from 'node-fetch'
import dotenv from "dotenv";
//const token_url = "https://core-integracion.azurewebsites.net/jwt/token"
const id = process.env.CORE_ID
const code = process.env.CORE_CODE
const core_endpoint = process.env.CORE +"api/publish"
const token= process.env.CORE_TOKEN // ||await getToken()

// async function getToken() { 
  
//     const response = await fetch(token_url, {
//     method: "GET",
//     body: JSON.stringify({
//       id: 442231154,
//       code: "8mFsQTU^'I7Sgt-8x)B2sXvJ2qqLtT"
//     }),
//     redirect:'follow',
//     headers: {
//       "Accept": 'application/json',
//       "Content-Type":"application/json"
//     }
//   }).then((response) => response)
//   .then(result =>  {return result})
//   .catch(error => console.log('error', error));
//   const res = await response.text();
//   console.log(res)
//   return res
// }
export async function sendNewTicketToCore(newTicket) {
  const body = {
    exchage:"new_driver_tickets",
    message:newTicket
  }
  const response = await fetch("https://core-integracion.azurewebsites.net/api/publish", {
    method: "POST",
    body: JSON.stringify({
      exchange:"new_driver_tickets",
      message:newTicket
    }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "Authorization": token || "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQyMjMxMTU0LCJjb2RlIjoiOG1Gc1FUVV4nSTdTZ3QtOHgpQjJzWHZKMnFxTHRUIn0.58jMwro7ZWc3hAH-uld5_kumOhzod3IUHHWewSqoA8U"//ver como refrescar y poner el token aca
    }
  }).then((response) => response)
  .then(result =>  {return result})
  .catch(error => console.log('error', error));
  const res = await response.json();

  return res
}
export default sendNewTicketToCore;