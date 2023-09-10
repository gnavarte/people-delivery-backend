import express from "express";
import {getViajes,createViaje,getViajeByID,getViajesByChoferId,updateViaje,assingToChofer  } from "../controllers/viajes.js";

const router = express.Router();

router.post("/new",createViaje);

router.get('/',getViajes)
router.get('/:id',getViajeByID);
router.get("/chofer/:choferID", getViajesByChoferId);

router.post('/assingToChofer/:id',assingToChofer)

router.post('/update/:id',updateViaje)


export default router;
