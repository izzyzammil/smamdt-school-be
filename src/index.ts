import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { StudentRoute, AdminRoute, SchoolCodeRoute, AuthRoute, TeacherRoute } from '@/routes';
import { Routes } from './interfaces';
import { APP_PORT, CREDENTIALS } from '@/config';
import { errorMiddleware } from './middlewares';
import dotenv from 'dotenv';
dotenv.config();

const authRoute = [new AuthRoute()];
const schoolCodeRoute = [new SchoolCodeRoute()];
const adminRoute = [new AdminRoute()];
const studentRoute = [new StudentRoute()];
const teacherRoute = [new TeacherRoute()];

export class App {
  public app: express.Application;

  constructor(routes: Routes[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public server = () => {
    this.app.listen(APP_PORT, () => {
      console.log('Server up and Running in Port 3333');
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(cors({ origin: true, credentials: CREDENTIALS }));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  };

  private initializeRoutes = (routes: Routes[]) => {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  };

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

const app = new App([...authRoute, ...schoolCodeRoute, ...adminRoute, ...studentRoute, ...teacherRoute]);
app.server();
