import { NextFunction, Request, Response } from "express";
import { HttpException } from "@/exceptions/HttpException";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";
    const errors: any = error.errors;

    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Errors:: ${errors ? JSON.stringify(errors) : null}`);
    res.status(status).json({ message, errors });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
