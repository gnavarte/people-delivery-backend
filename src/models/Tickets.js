import mongoose from "mongoose";

const TicketsSchema = new mongoose.Schema(
  {
    idTicket: { type: String, required: false },
    idSolicitante: { type: String, required: true },
    idReclamado: { type: String, required: true },
    idViaje: { type: String, required: true },
    asunto : { type: String, required: true },
    detalle: { type: String, required: true },
    status : { type: String, required: true, default:'NEW' },
    prioridad: { type: String, required: true, default:'BAJA' },
    TipoUsuario:{type: String, required: true },
    timestampCreacion: {type: Date,required: false},
    timestampActualizacion: {type: Date,required: false}

  },
  { timestamps: true }
);
TicketsSchema.pre('save', function(next) {
  this.idTicket = this._id
  this.timestampCreacion = this.createdAt
  this.timestampActualizacion = this.updatedAt
  next()
})

const Tickets = mongoose.model("Tickets", TicketsSchema);
export default Tickets;

