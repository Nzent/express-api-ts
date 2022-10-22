import { db } from "../utils/db.server";
import { AuthorTypes } from "./author.service";

type BookTypes = {
  id: number;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  author: AuthorTypes;
};

// Get:get all books
export const listBooks = async (): Promise<BookTypes[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};
