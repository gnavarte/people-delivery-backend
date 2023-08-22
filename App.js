import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

//SETUP
dotenv.config();
const app = express();

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json())

//ROUTES


//SERVER LISTEN
app.listen(process.env.PORT, () => {
  console.log(`>>> SERVER ON PORT ${process.env.PORT}`);
});
