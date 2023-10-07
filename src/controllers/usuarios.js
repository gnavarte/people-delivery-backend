import User from "../models/Usuarios.js";
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
<<<<<<< HEAD

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
  } catch (error) {}
};

export const setStatus = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const user = await User.findById(id)
    if (!user) return res.status(400).json({msg: 'Usuario no encontrado'})

    user.status = !user.status;
    user.save();
   
    res.status(200).json(user);
  } catch (error) {}
=======
export const updatePassword = async (req, res) => {
  try {
    const { email, actualPassword, newPassword } = req.body;
    const user = await User.findOne({email : email});
    const isMatch = await bcrypt.compare(actualPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials. " });
    }
    else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newPassword, salt);
      user.password = passwordHash;
      user.save();
      return res.status(200).json({ msg: "Password changed successfully. " });

    }
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export const  forgotPassword = async (req, res) => {
  try {
    const { email,newPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    user.password = passwordHash;
    user.save();
    return res.status(200).json({ msg: "Password changed successfully. " });


  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }

}


export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    if (!email) {
      return res.status(400).json({ message: "Debes proporcionar un correo electrónico" });
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
>>>>>>> 759d23ee6da8d6a50614c6046b21f7be2ffefb6b
};
