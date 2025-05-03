const { db } = require("../config/firebase.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config()

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const getUserById = async (req, res) => {
    try {
      const doc = await db.collection("users").doc(req.params.id).get();
      if (!doc.exists) return res.status(404).send("User not found");
  
      const userData = doc.data();
      res.json({ id: doc.id, ...userData });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const userRef = db.collection('users').where('email', '==', email);
    const snapshot = await userRef.get();
  
    if (snapshot.empty) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const userDoc = snapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() };
  
    const isMatch = await bcrypt.compare(password, user.pswrd);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
    const token = generateToken(user);
    res.json({ token });
  }

  module.exports = {getUserById, loginUser}