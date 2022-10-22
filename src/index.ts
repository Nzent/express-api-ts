import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { authorRouter } from "./routes/author.router";
import { bookRouter } from "./routes/book.router";
import { indexRouter } from "./routes/index.router";

// config environment variables
dotenv.config();


if (!process.env.PORT) {
  process.exit(1);
}

// initialize the port
const PORT: number = parseInt(process.env.PORT as string, 10);

// initialize the express app
const app = express();

// use cors and json
app.use(cors());
app.use(express.json());

// author routes
app.use("/", indexRouter);
app.use("/api/authors", authorRouter);
// books routes
app.use("/api/books", bookRouter);

// start the server
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}/`);
});
