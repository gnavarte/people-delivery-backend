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
import autosRoutes from "./src/routes/autos.routes.js";
import { register } from "./src/controllers/auth.js";
import { Server } from "socket.io";
import { createServer } from "http";

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
app.use("/api/autos", autosRoutes)

/* SOCKET.IO */
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  console.log(`>>> Socket.io: ${socket.id} connected.`);
  socket.on("disconnect", () => {
    console.log(`>>> Socket.io: ${socket.id} disconnected.`);
  });
});

/* SOCKET.IO ROUTES */
app.post("/api/viajes/callback", (req, res) => {
  const { message } = req.body;
  console.log(`>>> Socket.io: ${message}`);
  io.emit("message", message);
  res.send("Message sent.");
}
);

/* MOONGOSE SETUP & SERVER START */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`>>> Server running on port ${PORT}.`);
      displayRoutes(app);
    });
  })
  .catch((error) => console.log(`${error} did not connect.`));
