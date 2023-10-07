# DriverPeopleDeliveryBack

API de la aplicacion People Delivery para Choferes.

# Iniciar API
npm run dev

# API

## Usuarios

### Obtener todos los usuarios

- **Método**: GET
- **Ruta**: `/api/users`

### Obtener un usuario por ID

- **Método**: GET
- **Ruta**: `/api/users/{id}`
- **Parámetros de ruta**:
  - `id` (string): ID del usuario que se desea obtener.

### Actualizar un usuario

- **Método**: PATCH
- **Ruta**: `/api/users/{id}`
- **Parámetros de ruta**:
  - `id` (string): ID del usuario que se desea actualizar.
- **Parámetros del cuerpo (JSON)**:
  - Aquí debes incluir los campos que deseas actualizar en el usuario.

### Agregar calificación a un usuario

- **Método**: POST
- **Ruta**: `/api/users/addCalificacion/{id}`
- **Parámetros de ruta**:
  - `id` (string): ID del usuario al que deseas agregar una calificación.
- **Parámetros del cuerpo (JSON)**:
  - `rate` (number): La calificación (min: 1, max: 5) que deseas agregar al usuario.

### Establecer el estado de un usuario

- **Método**: PATCH
- **Ruta**: `/api/users/setStatus/{id}`
- **Parámetros de ruta**:
  - `id` (string): ID del usuario al que deseas cambiar el estado.
- **Parámetros del cuerpo (JSON)**:
  - ninguno

## Viajes

### Obtener todos los viajes

- **Método**: GET
- **Ruta**: `/api/viajes`

### Obtener un viaje por ID

- **Método**: GET
- **Ruta**: `/api/viajes/{id}`
- **Parámetros de ruta**:
  - `id` (string): ID del viaje que se desea obtener.

### Obtener viajes de un chofer

- **Método**: GET
- **Ruta**: `/api/viajes/chofer/{id}`
- **Parámetros de ruta**:
  - `choferID` (string): ID del chofer del que deseas obtener los viajes.

### Crear un nuevo viaje

- **Método**: POST
- **Ruta**: `/api/viajes/new`
- **Parámetros del cuerpo (JSON)**:
  - Aquí debes incluir los datos necesarios para crear un nuevo viaje.

### Asignar un viaje a un chofer

- **Método**: POST
- **Ruta**: `/api/viajes/assignToChofer/{id}`
- **Parámetros de ruta**:
  - `id` (string): ID del viaje que deseas asignar a un chofer.
- **Parámetros del cuerpo (JSON)**:
  - `choferID` (string): ID del chofer al que deseas asignar el viaje.

### Actualizar un viaje

- **Método**: PATCH
- **Ruta**: `/api/viajes/update/{id}`
- **Parámetros de ruta**:
  - `id` (string): ID del viaje que deseas actualizar.
- **Parámetros del cuerpo (JSON)**:
  - Aquí debes incluir los campos que deseas actualizar en el viaje.

## Pagos

### Procesar un pago

- **Método**: POST
- **Ruta**: `/api/pagos`
- **Parámetros del cuerpo (JSON)**:
  - {viajeId, choferId, totalPrice}


### Obtener todos los pagos

- **Método**: GET
- **Ruta**: `/api/pagos`

### Obtener pagos por ID de viaje

- **Método**: GET
- **Ruta**: `/api/pagos/{viajeId}`
- **Parámetros de ruta**:
  - `viajeId` (string): ID del viaje del que deseas obtener los pagos.

### Obtener pagos por ID de chofer

- **Método**: GET
- **Ruta**: `/api/pagos/{choferId}`
- **Parámetros de ruta**:
  - `choferId` (string): ID del chofer del que deseas obtener los pagos.