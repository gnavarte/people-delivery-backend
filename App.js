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
import ticketsRoute from "./src/routes/tickets.routes.js";
import { register } from "./src/controllers/auth.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { updateStatusById } from "./src/controllers/usuarios.js";
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
app.use("/api/autos", autosRoutes);
app.use("/api/ticket", ticketsRoute);

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
app.post("/api/viajes/newTripCallback", (req, res) => {
  console.log(`>>> Socket.io: ${req.body} received.`);
  io.emit("newTrip", req.body);
  res.status(200).send("New trip data received.");
});

app.post("/api/viajes/acceptedTripCallback", (req, res) => {
  console.log(`>>> Socket.io: ${req.body} received.`);
  io.emit("acceptedTrip", req.body);
  res.status(200).send("Accepted trip data received.");
});

app.post("/api/viajes/ongoingTripCallback", (req, res) => {
  console.log(`>>> Socket.io: ${req.body} received.`);
  io.emit("ongoingTrip", req.body);
  res.status(200).send("Ongoing trip data received.");
});

app.post("/api/viajes/finishedTripCallback", (req, res) => {
  console.log(`>>> Socket.io: ${req.body} received.`);
  io.emit("finishedTrip", req.body);
  res.status(200).send("Finished trip data received.");
});

app.post("/api/updateDriverStatus", async (req, res) => {
  try {
    var id = req.body.idChofer;
    var status = req.body.estado;
    console.log(id);
    console.log(status);

    const response = await updateStatusById(req.body.idChofer, req.body.estado);
    res.status(200).send("New trip data received.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the request.");
  }
});

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
