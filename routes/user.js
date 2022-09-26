const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const user = await User.find();
  return res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The user was not found in the database");
  return res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.send(404).send(error.message);

  const existingUser = User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("User already registered");

  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user.save();

  const { password, ...userWithout } = user.toObject();
  const token = user.generateAuthToken();
  return res.status(201).header("x-auth-token", token).send(userWithout);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.send(user);
});

module.exports = router;
