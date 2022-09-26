const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const books = require("./routes/books");
const auther = require("./routes/auther");
const genre = require("./routes/genre");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/books", books);
app.use("/api/auther", auther);
app.use("/api/genre", genre);

mongoose
  .connect("mongodb://localhost/books-backend")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Could not connect to MongoDB...", error));

app.listen(8000, () => console.log("listening on port 8000"));
