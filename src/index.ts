import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and RUnning in Port 3333");
});
