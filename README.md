# DriverPeopleDeliveryBack

API de la aplicacion People Delivery para Choferes.

# Iniciar API
npm run dev

## API

### Usuarios

GET /api/users
GET /api/users/{id}

POST /api/users/getByPlate
POST /api/users/getByDriverLic

PATCH /api/users/{id}

### Viajes


GET /api/viajes
GET /api/viajes/{id}
GET /api/viajes/chofer/{id}

POST /api/viajes/new
POST /api/viajes/assignToChofer/{id}
POST /api/viajes/update/{id}

### PAGOS
POST /api/pagos

GET /api/pagos
GET /api/pagos/{viajeId}
GET /api/pagos/{choferId}




