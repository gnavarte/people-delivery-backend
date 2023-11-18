import express from "express";
import {
  getViajes,
  createViaje,
  getViajeByID,
  getViajesByChoferId,
  updateViaje,
  assingToChofer,
} from "../controllers/viajes.js";

import Viajes from "../models/Viajes.js";

const router = express.Router();

router.post("/new", createViaje);
router.get("/", async (req, res) => {
  const viajes = await Viajes.find();
  return res.status(200).json(viajes);
});
router.post("/", getViajes);
router.get("/:id", getViajeByID);
router.get("/chofer/:choferID", getViajesByChoferId);

router.post("/assingToChofer/:id", assingToChofer);

router.post("/update/:id", updateViaje);

export default router;
