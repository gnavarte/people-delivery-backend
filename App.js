import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import multer from "multer";
import displayRoutes from "express-routemap";
import userRoutes from "./src/routes/usuarios.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import viajesRoutes from "./src/routes/viajes.routes.js";
import pagosRoutes from "./src/routes/pagos.routes.js";

import { register } from "./src/controllers/auth.js";

/* SETUP */
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));



/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/api/auth/register", upload.single("picture"), register);

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Bienvenido al back de DriverPeopleDelivery!");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/viajes", viajesRoutes);
app.use("/api/pagos", pagosRoutes);

/* MOONGOSE SETUP & SERVER START */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {

    app.listen(PORT, () => 
    {
      console.log(`>>> Server Port: ${PORT}`);
      displayRoutes(app);
    });
  })
  .catch((error) => console.log(`${error} did not connect.`));
