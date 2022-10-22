import * as BookService from "../service/book.service";
import express, { Request, Response } from "express";
export const bookRouter = express.Router();

// Get: Get all books

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const book = await BookService.listBooks();
    return res.status(200).json(book);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
