import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "@/exceptions/HttpException";

export const validationMiddleware = (
  type: any,
  value: string | "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, (req as any)[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          // formatted errors
          const formattedErrors: any = {};
          errors.map((error: ValidationError) => {
            formattedErrors[error.property] = getError(error);
          });

          // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');

          next(new HttpException(400, "Bad Request", formattedErrors));
        } else {
          next();
        }
      }
    );
  };
};

const getError = (error: ValidationError) => {
  if (error?.constraints) return Object.values(error.constraints);

  if (error?.children) {
    const result: any = {};
    for (const child of error.children) {
      result[child.property] = getError(child);
    }

    return result;
  }
};
