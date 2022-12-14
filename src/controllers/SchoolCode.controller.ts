import { SchoolCodeCreateDto } from "@/dtos";
import { SchoolCodeService } from "@/services";
import { NextFunction, Request, Response } from "express";

export class SchoolCodeController {
  public schoolCodeService = new SchoolCodeService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const args: SchoolCodeCreateDto = req.body;
      const result = await this.schoolCodeService.create(args);

      res.status(201).json({ message: "Success create school code", data: result });
    } catch (error) {
      next(error);
    }
  };
}
