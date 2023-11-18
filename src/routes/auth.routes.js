import express from "express";
import { login } from "../controllers/auth.js";
import { updatePassword, forgotPassword, deleteUser } from "../controllers/usuarios.js";
const router = express.Router();

router.post("/login", login);
router.post("/updatePwd", updatePassword);
router.post("/forgotPassword", forgotPassword);
router.delete("/delete", deleteUser)
export default router;
