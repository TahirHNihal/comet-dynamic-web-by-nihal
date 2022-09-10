const express = require("express");
const path = require("path");
const {
  homePage,
  aboutPage,
  shopPage,
  shopsinglePage,
  contactPage,
  dashboardPage,
  sliderCruds,
  clientsCruds,
  testimonialCruds,
  blogsCruds,
  productsCruds,
  sliderAdd,
  deleteSlider,
  sliderupdateCruds,sliderEditCruds
} = require("../controllers/cometControllers");
const multer = require("multer");

//Init Router
const router = express.Router();

//Config Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/slider_images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const cometPhotoMulter = multer({
  storage: storage,
}).single("sliderImage");

//Routes
router.get("/", homePage);
router.get("/about", aboutPage);
router.get("/shop", shopPage);
router.get("/shop/:id", shopsinglePage);
router.get("/contact", contactPage);
//Dashboard Routes
router.get("/dashboard", dashboardPage);
router.post("/slider", cometPhotoMulter, sliderAdd);
router.get("/slider", sliderCruds);
router.get("/clients", clientsCruds);
router.get("/testimonial", testimonialCruds);
router.get("/blogs", blogsCruds);
router.get("/products", productsCruds);
//Slider Delete Route
router.get("/slider/delete/:id", deleteSlider);
//Slider Update Route
router.get("/slider/edit/:id", sliderEditCruds);
router.post("/slider/update/:id", cometPhotoMulter, sliderupdateCruds);

//Export Modules
module.exports = router;
