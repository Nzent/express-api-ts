import * as BookService from "../service/book.service";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const bookRouter = express.Router();

// Get: get all books
bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const book = await BookService.listBooks();
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json("Books are empty");
    }
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

//Get: get a single book
bookRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const book = await BookService.getBook(id);
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json("Book not found");
    }
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// Post: create a book
bookRouter.post(
  "/",
  body("title").isString(),
  body("authorId").isInt(),
  body("datePublished").isDate().toDate(),
  body("isFiction").isBoolean(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const book = req.body;
      const newBook = await BookService.createBook(book);
      return res.status(201).json(newBook);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
);

// Put: update a book
bookRouter.put(
  "/:id",
  body("title").isString(),
  body("authorId").isInt(),
  body("datePublished").isDate().toDate(),
  body("isFiction").isBoolean(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id: number = parseInt(req.params.id, 10);

    try {
      const book = req.body;
      const updatedBook = await BookService.updateBook(book, id);
      return res.status(201).json(updatedBook);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
);

// Delete: delete a book
bookRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await BookService.deleteBook(id);
    return res.status(204).json("Book was successfully deleted");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
