import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export interface MyContext {
  res: NextApiResponse;
  prisma: PrismaClient;
  userId: string | null;
}
