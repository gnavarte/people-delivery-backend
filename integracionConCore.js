import fetch from "node-fetch";

const token_url = "https://core-integracion.azurewebsites.net/jwt/token";
const id = process.env.CORE_ID;
const code = process.env.CORE_CODE;
const core_endpoint = process.env.CORE + "api/publish";
const responseToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQyMjMxMTU0LCJjb2RlIjoiOG1Gc1FUVV4nSTdTZ3QtOHgpQjJzWHZKMnFxTHRUIn0.58jMwro7ZWc3hAH-uld5_kumOhzod3IUHHWewSqoA8U"; // ||await getToken()

async function getToken() {
  const response = await fetch(token_url, {
    method: "GET",
    body: JSON.stringify({
      id: 442231154,
      code: "8mFsQTU^'I7Sgt-8x)B2sXvJ2qqLtT",
    }),
    redirect: "follow",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response)
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
  const res = await response.text();
  console.log(res);
  return res;
}
async function sendToCore(newTicket) {
  token = await getToken();
  console.log(token);
  const body = {
    exchage: "new_driver_tickets",
    message: newTicket,
  };
  const response = await fetch(
    "https://core-integracion.azurewebsites.net/api/publish",
    {
      method: "POST",
      body: JSON.stringify({
        exchange: "new_driver_tickets",
        message: newTicket,
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: responseToken, //ver como refrescar y poner el token aca
      },
    }
  )
    .then((response) => response)
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
  const res = await response.text();

  return res;
}
export default sendToCore;

/*
    closed_trip {
      "viaje_id": *xxxxxxxx*,
      "status": 'closed',
      "finishTimestamp": Date
    }
  
  */

export async function sendClosedTripToCore(closed_trip) {
  const body = {
    exchange: "closed_trips",
    message: closed_trip,
  };

  try {
    const response = await fetch(
      "https://core-integracion.azurewebsites.net/api/publish",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: responseToken,
        },
      }
    );

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
  }
}

/*
bill_generated {
	"km": float,
	"origen": {
		"calle": string,
		"numero": string,
		"codigoPostal": string,
		"localidad": string,
		"provincia": string
	},
	"destino": {
		"calle": string,
		"numero": string,
		"codigoPostal": string,
		"localidad": string,
		"provincia": string
	},
	"fechaViaje": "yyyy-MM-ddTHH:mm:ss",
	"conceptos": [{
		"concepto": string,
		"monto": float
	}],
	"chofer": string,
	"pasajero": long,
	“idViaje”: string
}
*/

export async function sendGeneratedBillToCore(bill_generated) {
  const body = {
    exchange: "bill_generated",
    message: bill_generated,
  };

  try {
    const response = await fetch(
      "https://core-integracion.azurewebsites.net/api/publish",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: responseToken,
        },
      }
    );

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function sendCalificacionesToCore(calificaciones) {
  // const token = await getToken();
  const body = {
    exchange: "average_driver_review",
    message: calificaciones,
  };

  try {
    const response = await fetch(
      "https://core-integracion.azurewebsites.net/api/publish",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: responseToken,
        },
      }
    );

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
  }
}
