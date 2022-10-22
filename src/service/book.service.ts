import { db } from "../utils/db.server";
import { AuthorTypes } from "./author.service";

type BookReadTypes = {
  id: number;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  authorId?: number;
  author: AuthorTypes;
};

type BookWriteTypes = {
  title: string;
  datePublished: Date;
  authorId: number;
  isFiction: boolean;
};

// Get:get all books
export const listBooks = async (): Promise<BookReadTypes[]> => {
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

// Get: get a single book
export const getBook = async (id: number): Promise<BookReadTypes | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
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

//Post: create a book
export const createBook = async (
  book: BookWriteTypes
): Promise<BookReadTypes> => {
  const { title, authorId, datePublished, isFiction } = book;
  const parsedDate: Date = new Date(datePublished);
  return db.book.create({
    data: {
      title,
      authorId,
      isFiction,
      datePublished: parsedDate,
    },
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

// Post: update book
export const updateBook = async (
  book: BookWriteTypes,
  id: number
): Promise<BookReadTypes> => {
  const { title, isFiction, datePublished, authorId } = book;
  return db.book.update({
    where: {
      id,
    },
    data: {
      title,
      isFiction,
      datePublished,
      authorId,
    },
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

// Delete: delete a book
export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: {
      id,
    },
  });
  
};
