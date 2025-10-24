import express from "express";
import jwt from "jsonwebtoken";
import { authenticateToken } from '../middlewares/verifyToken.js';  
const router = express.Router();

// Dummy user data
const users = [{ username: 'karthik', password: 'priceaction' }]; 
// Login Route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET || "SECRET_KEY", {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Protected Route
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

export default router;
