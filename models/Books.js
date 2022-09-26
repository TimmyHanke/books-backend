const mongoose = require("mongoose");
const joi = require("joi");

const bookSchema = mongoose.Schema({
  titel: { type: String, required: true },
  pages: { type: Number, required: true },
  auther: { type: String, required: true },
  genre: { type: String, required: true },
});

function validateBook(book) {
  const Schema = joi.object({
    titel: joi.string().required().min(2).max(25),
    pages: joi.number().required().min(5),
    auther: joi.string().required().min(2).max(25),
    genre: joi.string().joi.required().min(2).max(25),
  });
}

const Books = mongoose.model("Book", bookSchema);

module.exports.Books = Books;
module.exports.validateBook = validateBook;
