import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Usuarios.js";
import Counter from '../models/Counter.js';
  
async function getNextSequence(name) {
  var ret = await Counter.findOneAndUpdate(         
          { name: name },
          {
            $inc:{ seq: 1 }
          },
          {new: true}
         
  )
return ret.seq
}


// REGISTER USER
export const register = async (req, res) => {
  try {

    const { firstName, lastName, address, dob, dni, picturePath, email, password } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const idChoferNum= await getNextSequence('idChofer')
    const newUser = new User({
      idChoferNum,
      firstName,
      lastName,
      address,
      dob,
      dni,
      picturePath,
      email,
      password: passwordHash,
    });
    console.log(newUser)

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* LOGIN */
export const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials. ' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
