import { db } from "../utils/db.server";

type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

// get all authors
export const listAuthors = async (): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

// get single author
export const getAuthor = async (id: number): Promise<Author | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
  });
};

// create a single author
export const createAuthor = async (
  author: Omit<Author, "id">
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.create({
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

// update a single author
export const updateAuthor = async (
  author: Omit<Author, "id">,
  id: number
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.update({
    where: { id },
    data: { firstName, lastName },
    select: { id: true, firstName: true, lastName: true },
  });
};

// delete a single author
export const deleteAuthor = async (id: number): Promise<void> => {
  await db.author.delete({
    where: {
      id,
    },
  });
};
