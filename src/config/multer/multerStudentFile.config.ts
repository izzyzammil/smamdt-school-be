import { HttpException } from "@/exceptions/HttpException";
import { RequestWithMember } from "@/interfaces";
import { prisma } from "@/libs";
import { diskStorage, Options } from "multer";
import { extname } from "path";
import fs from "fs";

export const multerRegisterMemberConfig = {
  storage: diskStorage({
    destination: (req: RequestWithMember, file, callback) => {
      const memberId = req.member.id;
      const dir = "./uploads/registrasi-anggota/" + memberId;

      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir);
        } catch (error) {
          return callback(new HttpException(500, "Internal server error"), dir);
        }
      }

      callback(null, dir);
    },
    filename: (req: RequestWithMember, file, callback) => {
      const memberId = req.member.id;
      const now = new Date().getTime();
      const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join("");

      callback(null, `${memberId}_${now}_${randomName}${extname(file.originalname)}`);
    },
  }),

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: async (req: RequestWithMember, file, callback) => {
    const memberId = req.member.id;
    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member) return callback(new HttpException(400, "Member not found"));

    if (member.verifiedTimestamp) return callback(new HttpException(400, "Member has beend verified"));

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return new HttpException(400, "Only image files are allowed!");

    callback(null, true);
  },
} as Options;
