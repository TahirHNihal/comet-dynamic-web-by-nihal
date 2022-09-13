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
  productsDelete,
  blogDelete,
} = require("../controllers/dashboardControllers");
const multer = require("multer");

//Init Router
const router = express.Router();

//Config multer for all sections Start
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (req.files.sliderImage) {
//       cb(null, path.join(__dirname, "../public/images/slider_images/"));
//     }else{console.log('Slider Image Not Found');}
//     if (req.files.blogImage) {
//       cb(null, path.join(__dirname, "../public/images/blog_images/"));
//     }else{console.log('Blog Image Not Found');}
//   },
// });
// const allPhotoMulter = multer({
//   storage,
// }).fields([
//   {
//     name: "sliderImage",
//     maxCount: 1,
//   },
//   {
//     name: "blogImage",
//     maxCount: 1,
//   },
// ]);


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
//Dashboard Routers
router.get("/dashboard", dashboardPage);
//Slider Routers
router.post("/slider", sliderPhotoMulter, sliderAdd);
router.get("/slider", sliderCruds);
//Slider Delete Routers
router.get("/slider/delete/:id", deleteSlider);
//Slider Edit & Update Routers
router.get("/slider/edit/:id", sliderEditCruds);
router.post("/slider/update/:id", sliderPhotoMulter, sliderupdateCruds);
//Client Routers
router.get("/clients", clientsCruds);
router.post("/clients", clientPhotoMulter, clientsAdd);
//Client Delete Routers
router.get("/clients/delete/:id", deleteClients);
//Testimonial Routers
router.get("/testimonial", testimonialCruds);
//Testimonial Add Routes
router.post("/testimonial", testimonialForm);
//Testimonial Delete Routers
router.get("/testimonial/delete/:id", testimonialDelete);
//Testimonial Edit & Update Routers
router.get("/testimonial/edit/:id", testimonialEditCruds);
router.post("/testimonial/update/:id", testimonialUpdate);
//Blog Routers
router.get("/blogs", blogsCruds);
router.post("/blogs", blogPhotoMulter, blogsAdd);
//Blog Delete Routers
router.get("/blog/delete/:id", blogDelete);
//Products Routers
router.get("/products", productsCruds);
router.post("/products", productPhotoMulter, productsAdd);
//Products Delete Routers
router.get("/products/delete/:id", productsDelete);

//Export Modules
module.exports = router;
