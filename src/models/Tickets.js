import mongoose from "mongoose";
const conn =  mongoose.connection

const TicketsSchema = new mongoose.Schema(
  {
    idTicket:{type:Number, required:true},
    idSolicitante: { type: Number, required: true },
    idReclamado: { type: Number, required: true },
    idViaje: { type: Number, required: true },
    asunto : { type: String, required: true },
    detalle: { type: String, required: true },
    status : { type: String, required: true, default:'NEW' },
    prioridad: { type: String, required: true, default:'BAJA' },
    TipoUsuario:{type: String, required: true,default:'CHOFER' },
    timestampCreacion: {type: Date,required: false},
    timestampActualizacion: {type: Date,required: false}

  },
  { timestamps: true }
);
TicketsSchema.pre('save', function(next) {
  this.timestampCreacion = this.createdAt
  this.timestampActualizacion = this.updatedAt
  next()
})

const Tickets = mongoose.model("Tickets", TicketsSchema);
export default Tickets;

