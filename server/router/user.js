const userSchema = require("../model/userSchema.js");
const bcrypt = require("bcrypt");
const express = require("express");
const { db } = require("../config/firebase.js");
const router = express.Router();
const {getUserById, loginUser} = require('../controller/user.js')

router.post("/add-user", async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 🔍 Check if email already exists
    const existingUser = await db.collection("users")
      .where("email", "==", value.email)
      .get();

    if (!existingUser.empty) {
      return res.status(400).send("Email already exists");
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(value.pswrd, 10);

    // 📦 Save user with hashed password
    const userData = {
      name: value.name,
      email: value.email,
      pswrd: hashedPassword,
      idNumber: value.idNumber
    };

    const docRef = await db.collection("users").add(userData);
    res.send(`User added with ID: ${docRef.id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/user/:id", getUserById);

router.get("/user-by-email", async (req, res) => {
  try {
    const { email } = req.query; // Get email from query string

    if (!email) {
      return res.status(400).send("Email is required");
    }

    const snapshot = await db.collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(404).send("User not found");
    }
    const user = snapshot.docs[0].data();
    delete user.pswrd; 

    res.json({ id: snapshot.docs[0].id, ...user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.post('/login', loginUser)


module.exports = router;
