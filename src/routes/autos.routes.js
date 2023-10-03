import express from "express";

import {
    newAuto,
    getAutos,
    } from "../controllers/autos.js";


const router = express.Router();

//CREATE
router.post("/new", newAuto)
router.post("/", getAutos)
export default router;