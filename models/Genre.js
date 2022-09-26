const mongoose = require("mongoose");
const joi = require("joi");

const genreSchema = mongoose.Schema({
  name: { type: String, required: true },
});

function validateGenre(genre) {
  const schema = joi.object({
    genre: joi.required().min(2).max(25),
  });
  return schema.validate(genre);
}

const Genre = mongoose.model("genre", genreSchema);

module.exports = {
  Genre,
  validateGenre,
  genreSchema,
};
