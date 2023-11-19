import express from "express";

import {
    getTickets,
    newTicket,
    updateTicket,
    } from "../controllers/tickets.js";


const router = express.Router();

//CREATE
router.post("/newTicket", newTicket)
router.post("/getTickets",getTickets)
router.post("/updateTicket", updateTicket)
export default router;