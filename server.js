const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const webRoutes = require("./routes/cometRoutes");
const expressLayout = require("express-ejs-layouts");

//Environtment Init
dotenv.config();
const PORT = process.env.PORT || 4000;

// Init Express
const app = express();

//Data Manage
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Folder Static
app.use(express.static("public"));

//EJS Init
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "layouts/app");

//Routes
app.use("/", webRoutes);

//Listen Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.white);
});
