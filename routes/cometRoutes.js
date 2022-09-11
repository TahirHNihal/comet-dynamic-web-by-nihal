const express = require("express");
const path = require("path");
const {
  homePage,
  aboutPage,
  shopPage,
  shopsinglePage,
  contactPage,

} = require("../controllers/cometControllers");
const multer = require("multer");

//Init Router
const router = express.Router();

//Routes
router.get("/", homePage);
router.get("/about", aboutPage);
router.get("/shop", shopPage);
router.get("/shop/:id", shopsinglePage);
router.get("/contact", contactPage);


//Export Modules
module.exports = router;
