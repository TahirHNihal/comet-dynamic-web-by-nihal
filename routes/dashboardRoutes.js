const express = require("express");
const path = require("path");
const {
  dashboardPage,
  sliderCruds,
  clientsCruds,
  testimonialCruds,
  blogsCruds,
  productsCruds,
  sliderAdd,
  deleteSlider,
  sliderupdateCruds,
  sliderEditCruds,
  testimonialForm,
  testimonialDelete,
  testimonialUpdate,
  testimonialEditCruds,
  blogsAdd,
  clientsAdd,
  deleteClients,
  productsAdd,
  productsDelete,blogDelete
} = require("../controllers/dashboardControllers");
const multer = require("multer");

//Init Router
const router = express.Router();

//Config multer for all sections Start

//Config Multer for Silder
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/slider_images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const sliderPhotoMulter = multer({
  storage: storage1,
}).single("sliderImage");

//Config Multer for Blog
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/blog_images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const blogPhotoMulter = multer({
  storage: storage2,
}).single("blogImage");

//Config Multer for Client
const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/client_images/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const clientPhotoMulter = multer({
  storage: storage3,
}).single("clientImage");

//Config Multer for Products
const storage4 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/product_images/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const productPhotoMulter = multer({
  storage: storage4,
}).single("productImage");

//Config multer for all sections end

//Routes
//Dashboard Routes
router.get("/dashboard", dashboardPage);
router.post("/slider", sliderPhotoMulter, sliderAdd);
router.get("/slider", sliderCruds);
//Client Routes
router.get("/clients", clientsCruds);
router.post("/clients", clientPhotoMulter, clientsAdd);
router.get("/clients/delete/:id", deleteClients);
//Testimonial Routes
router.get("/testimonial", testimonialCruds);
//Testimonial Add Routes
router.post("/testimonial", testimonialForm);
//Testimonial Delete Routes
router.get("/testimonial/delete/:id", testimonialDelete);
//Testimonial Update Routes
router.get("/testimonial/edit/:id", testimonialEditCruds);
router.post("/testimonial/update/:id", testimonialUpdate);
//Blog Routes
router.get("/blogs", blogsCruds);
router.post("/blogs", blogPhotoMulter, blogsAdd);
//Blog Delete
router.get('/blog/delete/:id', blogDelete)
//Products Routes
router.get("/products", productsCruds);
router.post("/products",productPhotoMulter, productsAdd);
//Products Delete
router.get("/products/delete/:id", productsDelete);
//Slider Delete Route
router.get("/slider/delete/:id", deleteSlider);
//Slider Update Route
router.get("/slider/edit/:id", sliderEditCruds);
router.post("/slider/update/:id", sliderPhotoMulter, sliderupdateCruds);

//Export Modules
module.exports = router;
