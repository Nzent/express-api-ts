import express, { Request, Response } from "express";
import { home } from "../views/index";
export const indexRouter = express.Router();
// Get: Get all books
indexRouter.get("/", async (req: Request, res: Response) => {
  try {
    return res.status(200).send(home);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
