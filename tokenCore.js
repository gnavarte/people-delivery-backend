import fetch from 'node-fetch'

const core_endpoint = "https://core-integracion.azurewebsites.net/jwt/token"
const id = process.env.CORE_ID
const code = process.env.CORE_CODE

async function getToken() { 
    const response = await fetch(core_endpoint, {
    method: "POST",
    body: JSON.stringify({
        "id": id, 
        "code": code
    }),
    headers: {
    Accept: 'application/json',
      "Content-type": "application/json; charset=UTF-8",
    }
  })
  const res = await response.json();
  return res
}
  export default getToken