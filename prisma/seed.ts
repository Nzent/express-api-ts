import { db } from "../src/utils/db.server";

type AuthorProps = {
  firstName: string;
  lastName: string;
};

type BookProps = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

function getBooks(): Array<BookProps> {
  return [
    {
      title: "Sapience",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Homo deus",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "The hils",
      isFiction: true,
      datePublished: new Date(),
    },
  ];
}

function getAuthors(): Array<AuthorProps> {
  return [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "David",
      lastName: "Kenway",
    },
    {
      firstName: "Harry",
      lastName: "Style",
    },
  ];
}

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );

  const author = await db.author.findFirst({
    where: {
      firstName: "John",
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author.id,
        },
      });
    })
  );
}
seed();
