import fs from "fs";
import bcrypt from "bcryptjs";

const filePath = "./db.json";

// Read existing db.json
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Hash passwords for admins
if (data.admins) {
  data.admins = data.admins.map(admin => ({
    ...admin,
    password: bcrypt.hashSync(admin.password, 10)
  }));
}

// Hash passwords for users
if (data.users) {
  data.users = data.users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10)
  }));
}

// Write back to db.json
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log("✅ All passwords in db.json have been hashed successfully!");
