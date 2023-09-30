import express from "express";

import {
  newPago,
  getPagos,
  getPagosByIdViaje,
  getPagosByIdChofer,
} from "../controllers/pagos";

const router = express.Router();

//CREATE
router.post("/", newPago)

// READ
router.get("/", getPagos)
router.get("/:viajeId", getPagosByIdViaje)
router.get("/:choferId", getPagosByIdChofer)

export default router;