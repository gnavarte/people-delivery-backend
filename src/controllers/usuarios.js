import { sendCalificacionesToCore } from "../../integracionConCore.js";
import User from "../models/Usuarios.js";
import Viaje from "../models/Viajes.js";
import bcrypt from "bcrypt";
// READ
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserByDriverLic = async (req, res) => {
  try {
    const { driverLic } = req.body;
    const user = await User.findOne({ driverLic });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getByPlate = async (req, res) => {
  try {
    const { plate } = req.body;
    const user = await User.findOne({ "carInformation.carPlate": plate });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStatusById = async (id, estado) => {
  try {
    var userID=id;
    var estadoUpdate=estado;
    console.log(userID)
    console.log(estadoUpdate)
    // BUSCAR AL USUARIO POR ID
    const user = await User.findById(id);

    // VERIFICAR SI EL USUARIO EXISTE
    if (!user) {
      console.log("user no encontrado");
      throw new Error("Usuario no encontrado");
    }

    var estadoNuevo = estado;
    if (estadoNuevo === "FINALIZADO") {
      user.status = true;
    } else if (estadoNuevo === "RECHAZADO") {
      user.status = false;
    } else {
      user.status = false;
    }

    console.log(user);
    await user.save();
    return user;
  } catch (error) {
    // MANEJAR ERRORES
    console.error(error.message);
    throw new Error(error.message); // Cambiado de res.status(500) a throw new Error
  }
};


//UPDATE
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCalificacionesById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const allViajes = await Viaje.find({ choferID: id });
    const calificaciones = [];
    allViajes.forEach((e) => calificaciones.push(e.valoracion));

    res.json({ calificaciones });
  } catch (error) {
    console.log(error);
  }
};
export const addCalificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { newRate } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $push: { rate: newRate } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);

    try {
      const allViajes = await Viaje.find({ choferID: id });
      const calificaciones = [];
      allViajes.forEach((e) => calificaciones.push(e.valoracion));
      
      const data = {
        choferId: id,
        calificaciones,
      };
      const res = await sendCalificacionesToCore(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {}
};

export const setStatus = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const user = await User.findById(id);
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

    user.status = !user.status;
    user.save();

    res.status(200).json(user);
  } catch (error) {}
};
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res
        .status(400)
        .json({ message: "Debes proporcionar un correo electrónico" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(201).json({ userID: user._id });
    }

    return res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    user.password = passwordHash;
    user.save();
    return res.status(200).json({ msg: "Password changed successfully. " });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updatePassword = async (req, res) => {
  try {
    const { email, actualPassword, newPassword } = req.body;
    const user = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(actualPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials. " });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newPassword, salt);
      user.password = passwordHash;
      user.save();
      return res.status(200).json({ msg: "Password changed successfully. " });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
