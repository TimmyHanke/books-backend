const express = require("express");
const router = express.Router();
const { Books } = require("../models/Books");
const { Genre } = require("../models/Genre");
const { Auther } = require("../models/Auther");
const { validateBook } = require("../models/Books");

router.get("/", async (req, res) => {
  const books = await Books.find();
  return res.send(books);
});

router.get("/:id", async (req, res) => {
  const book = await Books.findById(req.params.id);
  console.log(book);
  if (!book)
    return res.status(404).send("The book does not exist in the database");
  return res.send(book);
});

router.post("/", async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.message);

  const auther = await new Auther({
    name: req.body.auther.name,
    age: req.body.auther.age,
    email: req.body.auther.email,
    _id: req.body.auther._id,
  });

  await auther.save();
  if (!auther)
    return res.status(404).send("The auther with the given id was not found");
  const id = auther._id;

  const genre = await new Genre({
    name: req.body.genre.name,
    _id: id,
  });
  await genre.save();
  if (!genre)
    return res.status(404).send("The genre with the given id was not found");

  const book = await new Books({
    titel: req.body.titel,
    pages: req.body.pages,
    _id: id,

    auther: {
      name: req.body.auther.name,
      age: req.body.auther.age,
      email: req.body.auther.email,
    },
    genre: {
      name: req.body.genre.name,
    },
  });
  await book.save();
  return res.send(book);
});

router.put("/:id", async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.message);

  const book = await Books.findById(req.params.id);
  if (!book)
    return res.status(404).send("The auther does not exist in the database");

  const auther = await Auther.findById(req.params.id);
  if (!auther)
    return res.status(404).send("The auther does not exist in the database");

  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre does not exit in the database");

  (book.titel = req.body.titel),
    (book.pages = req.body.pages),
    (book.auther = auther);
  book.genre = genre;

  book.save();
  return res.send(book);
});

router.delete("/:id", async (req, res) => {
  const auther = await Auther.findByIdAndDelete(req.params.id);
  const genre = await Genre.findByIdAndDelete(req.params.id);
  const book = await Books.findByIdAndDelete(req.params.id);

  return res.send(book);
});

module.exports = router;
