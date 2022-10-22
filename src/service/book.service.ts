import { db } from "../utils/db.server";

type BookTypes = {
  id: number;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  authorId: number;
};

// Get:get all books
export const listBooks = async (): Promise<BookTypes[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      authorId: true,
    },
  });
};
