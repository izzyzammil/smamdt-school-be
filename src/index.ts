import express from "express";
import cors from "cors";
import { StudentRoute } from "@/routes/Student.route";
import { Routes } from "./interfaces";
// import dotenv from "dotenv";
// dotenv.config();

const studentRoute = [new StudentRoute()];
export class App {
  public app: express.Application;

  constructor(routes: Routes[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public server = () => {
    this.app.listen(process.env.APP_PORT, () => {
      console.log("Server up and RUnning in Port 3333");
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(cors());
    this.app.use(express.json());
  };

  private initializeRoutes = (routes: Routes[]) => {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  };
}

const app = new App([...studentRoute]);
app.server();
