import { db } from "../utils/db.server";

type AuthorTypes = {
  id: number;
  firstName: string;
  lastName: string;
};

// get all authors
export const listAuthors = async (): Promise<AuthorTypes[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

// get single author
export const getAuthor = async (id: number): Promise<AuthorTypes | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
  });
};

// create a single author
export const createAuthor = async (
  author: Omit<AuthorTypes, "id">
): Promise<AuthorTypes> => {
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
  author: Omit<AuthorTypes, "id">,
  id: number
): Promise<AuthorTypes> => {
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
