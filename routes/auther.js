const express = require("express");
const router = express.Router();
const { Auther } = require("../models/Auther");

router.get("/", async (req, res) => {
  const auther = await Auther.find();
  return res.send(auther);
});

router.get("/:id", async (req, res) => {
  const auther = await Auther.findById(req.params.id);
  if (!auther)
    return res.status(404).send("The auther does not exist in the database");
  return res.send(auther);
});

module.exports = router;
