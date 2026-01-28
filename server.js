// server.js
const express = require("express");
const jsonServer = require("json-server");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const fs = require("fs");

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(express.json());
app.use(middlewares);

// 🔐 REGISTER endpoint — Hash password before saving
app.post("/register", async (req, res) => {
  const { name, email, password, role, active, block } = req.body;

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const userExists = db.users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role: role || "user",
    active: active ?? true,
    block: block ?? false,
  };

  db.users.push(newUser);
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

  res.status(201).json({ message: "User registered successfully" });
});

// 🔑 LOGIN endpoint — Compare hashed password
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));

  const admin = db.admins?.find((a) => a.email === email);
  if (admin) {
    const match = await bcrypt.compare(password, admin.password);
    if (match) return res.json({ ...admin, role: "admin" });
  }

  const user = db.users?.find((u) => u.email === email);
  if (user) {
    if (!user.active || user.block)
      return res.status(403).json({ error: "Account suspended" });

    const match = await bcrypt.compare(password, user.password);
    if (match) return res.json({ ...user, role: "user" });
  }

  res.status(400).json({ error: "Invalid email or password" });
});

// Use json-server router for normal CRUD
app.use(router);

app.listen(5000, () => {
  console.log("🚀 JSON Server with Auth running at http://localhost:5000");
});
