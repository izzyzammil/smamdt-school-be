import "reflect-metadata";
import express from "express";
import cors from "cors";
import { StudentRoute } from "@/routes/Student.route";
import { Routes } from "./interfaces";
import { errorMiddleware } from "./middlewares";
import dotenv from "dotenv";
import { SchoolCodeRoute } from "./routes/SchoolCode.route";
dotenv.config();

const studentRoute = [new StudentRoute()];
const schoolCodeRoute = [new SchoolCodeRoute()];
export class App {
  public app: express.Application;

  constructor(routes: Routes[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public server = () => {
    this.app.listen(process.env.APP_PORT, () => {
      console.log("Server up and Running in Port 3333");
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(cors({ origin: true, credentials: process.env.CREDENTIALS === "true" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  private initializeRoutes = (routes: Routes[]) => {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  };

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

const app = new App([...studentRoute, ...schoolCodeRoute]);
app.server();
