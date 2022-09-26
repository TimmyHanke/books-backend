const mongoose = require("mongoose");
const joi = require("joi");
const typeEmail = require("mongoose-type-email");

const autherSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  age: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, required: true },
});

const Auther = mongoose.model("auther", autherSchema);

function validateAuther(auther) {
  const schema = joi.object({
    name: joi.string().required().min(2),
    age: joi.string().required().min(10).max(120),
    email: joi.string().required(),
  });
  return schema.validate(auther);
}

module.exports = {
  Auther,
  validateAuther,
  autherSchema,
};
