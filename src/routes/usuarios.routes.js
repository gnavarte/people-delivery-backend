import express from "express";
import {
  addCalificacion,
  getByPlate,
  getUserByDriverLic,
  getUserById,
  getUsers,
  setStatus,
  updateUsuario,
} from "../controllers/usuarios.js";

const router = express.Router();

// READ
router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/getByPlate", getByPlate);
router.post("/getByDriverLic", getUserByDriverLic);

// UPDATE
router.patch("/:id", updateUsuario);
router.patch("/addCalificacion/:id", addCalificacion);
router.patch("/setStatus/:id", setStatus);

export default router;
