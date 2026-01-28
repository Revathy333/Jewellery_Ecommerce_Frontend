import fs from "fs";
import bcrypt from "bcryptjs";

// Path to your db.json
const dbPath = "./db.json";

// Read db.json
const rawData = fs.readFileSync(dbPath, "utf-8");
const db = JSON.parse(rawData);

// Hash a single password
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Hash all admin passwords
if (db.admins) {
  db.admins = db.admins.map((admin) => ({
    ...admin,
    password: hashPassword(admin.password),
  }));
}

// Hash all user passwords
if (db.users) {
  db.users = db.users.map((user) => ({
    ...user,
    password: hashPassword(user.password),
  }));
};

// Write the updated db back
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log("✅ All passwords hashed successfully!");
