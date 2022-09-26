const express = require("express");
const router = express.Router();
const { Genre } = require("../models/Genre");

router.get("/", async (req, res) => {
  const genre = await Genre.find();
  return res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre does not exist in the database");
  return res.send(genre);
});

module.exports = router;
