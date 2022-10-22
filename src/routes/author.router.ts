import express, { Request, Response } from "express";
import * as AuthorService from "../service/author.service";
export const authorRouter = express.Router();

// get all authors list
authorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return res.status(200).json(authors);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

//get a single author

authorRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return res.status(200).json(author);
    }

    return res.status(404).json("Author not found");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
