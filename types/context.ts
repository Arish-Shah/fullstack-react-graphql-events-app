import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export interface MyContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}
