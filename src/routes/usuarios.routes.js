import express from "express";
import {
  getByPlate,
  getUserByDriverLic,
  getUserById,
  getUsers,
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

export default router;
