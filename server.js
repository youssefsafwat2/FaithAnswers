const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./db");

const app = require("./app");
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

connectDB();
dotenv.config({ path: "./.env" });
