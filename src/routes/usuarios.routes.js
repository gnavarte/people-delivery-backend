import express from "express";
import { getUserById, getUsers } from "../controllers/usuarios.js";

const router = express.Router();

// READ
router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
