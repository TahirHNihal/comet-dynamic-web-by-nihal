const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const { json } = require("express/lib/response");
const { title } = require("process");

//Dashboard Page
const dashboardPage = (req, res) => {
  res.render("dashboard/index");
};
//Slider Cruds Page
const sliderCruds = (req, res) => {
  //Get Slider Data
  const slider = JSON.parse(
    readFileSync(path.join(__dirname, "../db/slider.json"))
  );
  res.render("dashboard/slider", {
    slider,
  });
};
/// Slider Add
const sliderAdd = (req, res) => {
  //Get Slider Data
  const slider = JSON.parse(
    readFileSync(path.join(__dirname, "../db/slider.json"))
  );
  //Get Id
  let id = 1;
  if (slider.length > 0) {
    id = slider[slider.length - 1].id + 1;
  }

  const { title, des, sliderImage } = req.body;

  slider.push({
    id: id,
    title: title,
    des: des,
    photo: req.file ? req.file.filename : "bg1.jpg",
  });

  //Now Write Data to json db
  writeFileSync(
    path.join(__dirname, "../db/slider.json"),
    JSON.stringify(slider)
  );

  //Redirect
  res.redirect("/slider");
};
//Edit Slider
const sliderEditCruds = (req, res) => {
  //Get Slider Data
  const slider = JSON.parse(
    readFileSync(path.join(__dirname, "../db/slider.json"))
  );
  //Get Id
  const { id } = req.params;
  //Find & Edit Id
  const editSlider = slider.find((data) => data.id == id);

  res.render("dashboard/slideredit", {
    slide: editSlider,
  });
};
//Slider Update Page
const sliderupdateCruds = (req, res) => {
  //All Students Data
  const slider = JSON.parse(
    readFileSync(path.join(__dirname, "../db/slider.json"))
  );
  //Get Id
  const { id } = req.params;

  const { title, des, sliderImage } = req.body;

  slider[slider.findIndex((data) => data.id == id)] = {
    ...slider[slider.findIndex((data) => data.id == id)],

    title: title,
    des: des,
  };
  writeFileSync(
    path.join(__dirname, "../db/slider.json"),
    JSON.stringify(slider)
  );

  //Redirect
  res.redirect("/slider");
};

// Delete Slider
const deleteSlider = (req, res) => {
  //Get Slider Data
  const slider = JSON.parse(
    readFileSync(path.join(__dirname, "../db/slider.json"))
  );
  //Get Id
  const { id } = req.params;

  //New Sliders
  const newSlider = slider.filter((data) => data.id != id);

  //Now Write Data to json db
  writeFileSync(
    path.join(__dirname, "../db/slider.json"),
    JSON.stringify(newSlider)
  );

  //Redirect
  res.redirect("/slider");
};

//Clients Cruds Page
const clientsCruds = (req, res) => {
  //Get Client Data From DB
  const clients = JSON.parse(
    readFileSync(path.join(__dirname, "../db/client.json"))
  );
  res.render("dashboard/clients", {
    clients,
  });
};
//Clients Add
const clientsAdd = (req, res) => {
  //Get Client Data From DB
  const clients = JSON.parse(
    readFileSync(path.join(__dirname, "../db/client.json"))
  );
  //Get Id
  let id = 1;
  if (clients.length > 0) {
    id = clients[clients.length - 1].id + 1;
  }
  const { photo } = req.body;
  clients.push({
    id: id,
    photo: req.file ? req.file.filename : "",
  });
  //Write Data
  writeFileSync(
    path.join(__dirname, "../db/client.json"),
    JSON.stringify(clients)
  );
  //Redirect
  res.redirect("/clients");
};
//Clients Delete
const deleteClients = (req, res) => {
  //Get Client Data From DB
  const clients = JSON.parse(
    readFileSync(path.join(__dirname, "../db/client.json"))
  );
  //Get Id
  const { id } = req.params;
  //New Clients
  const newClients = clients.filter((data) => data.id != id);

  //Write Data
  writeFileSync(
    path.join(__dirname, "../db/client.json"),
    JSON.stringify(newClients)
  );
  console.log(newClients);
  //Redirect
  res.redirect("/clients");
};
//Testimonial Cruds Page
const testimonialCruds = (req, res) => {
  //Get All Testimonial Data
  const testimonials = JSON.parse(
    readFileSync(path.join(__dirname, "../db/testimonial.json"))
  );
  res.render("dashboard/testimonial", {
    testimonials,
  });
};
//Testimonial Add
const testimonialForm = (req, res) => {
  //Get All Testimonial Data
  const testimonials = JSON.parse(
    readFileSync(path.join(__dirname, "../db/testimonial.json"))
  );

  //Get Id
  let id = 1;
  if (testimonials.length > 0) {
    id = testimonials[testimonials.length - 1].id + 1;
  }
  //Get Form Data
  const { rvText, clName } = req.body;
  //Push Data to JSON DB
  testimonials.push({
    id: id,
    review: rvText,
    clientName: clName,
  });

  //Write Data to JSON DB
  writeFileSync(
    path.join(__dirname, "../db/testimonial.json"),
    JSON.stringify(testimonials)
  );

  //Redirect
  res.redirect("/testimonial");
};
//Testimonial Delete
const testimonialDelete = (req, res) => {
  //Get All Testimonial Data
  const testimonials = JSON.parse(
    readFileSync(path.join(__dirname, "../db/testimonial.json"))
  );
  //Get Id
  const { id } = req.params;
  //New Testimonail
  const newTestimonial = testimonials.filter((data) => data.id != id);

  //Now Write Data to json db
  writeFileSync(
    path.join(__dirname, "../db/testimonial.json"),
    JSON.stringify(newTestimonial)
  );

  //Redirect
  res.redirect("/testimonial");
};
//Testimonial Edit
const testimonialEditCruds = (req, res) => {
  //Get All Testimonial Data
  const testimonials = JSON.parse(
    readFileSync(path.join(__dirname, "../db/testimonial.json"))
  );
  //Get Id
  const { id } = req.params;
  //New Testimonail
  const editTestimonial = testimonials.find((data) => data.id == id);

  res.render("dashboard/testimonialedit", {
    testimonial: editTestimonial,
  });
};
//Testimonial Update
const testimonialUpdate = (req, res) => {
  //Get All Testimonial Data
  const testimonials = JSON.parse(
    readFileSync(path.join(__dirname, "../db/testimonial.json"))
  );
  //Get Id
  const { id } = req.params;
  const { rvText, clName } = req.body;
  testimonials[testimonials.findIndex((data) => data.id == id)] = {
    ...testimonials[testimonials.findIndex((data) => data.id == id)],

    review: rvText,
    clientName: clName,
  };
  writeFileSync(
    path.join(__dirname, "../db/testimonial.json"),
    JSON.stringify(testimonials)
  );
  //Redirect
  res.redirect("/testimonial");
};
//Blogs Cruds Page
const blogsCruds = (req, res) => {
  //Get Blogs Data
  const blogs = JSON.parse(
    readFileSync(path.join(__dirname, "../db/blog.json"))
  );
  res.render("dashboard/blogs", {
    blogs,
  });
};
//Blogs Add
const blogsAdd = (req, res) => {
  //Get Blogs Data
  const blogs = JSON.parse(
    readFileSync(path.join(__dirname, "../db/blog.json"))
  );

  let id = 1;
  if (blogs.length > 0) {
    id = blogs[blogs.length - 1].id + 1;
  }

  const { title, des, blogImage } = req.body;
  blogs.push({
    id: id,
    title: title,
    des: des,
    photo: req.file ? req.file.filename : "",
  });

  //Write data to JSON DB
  writeFileSync(path.join(__dirname, "../db/blog.json"), JSON.stringify(blogs));

  //Redirect
  res.redirect("/blogs");
};
//Blogs Delete
const blogDelete = (req, res) => {
  //Get Blogs Data
  const blogs = JSON.parse(
    readFileSync(path.join(__dirname, "../db/blog.json"))
  );

  const { id } = req.params;

  const newBlogs = blogs.filter((data) => data.id != id);
  //Write data to JSON DB
  writeFileSync(
    path.join(__dirname, "../db/blog.json"),
    JSON.stringify(newBlogs)
  );

  //Redirect
  res.redirect("/blogs");
};
//Products Cruds Page
const productsCruds = (req, res) => {
  //Get All Products Data
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/product.json"))
  );
  res.render("dashboard/products", {
    products,
  });
};
//Products Add
const productsAdd = (req, res) => {
  //Get All Products Data
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/product.json"))
  );

  //Get Id
  let id = 1;
  if (products.length > 0) {
    id = products[products.length - 1].id + 1;
  }
  const { title, rPrice, sPrice, photo, des } = req.body;

  products.push({
    id: id,
    pTitle: title,
    rPrice: rPrice,
    sPrice: sPrice,
    pDes: des,
    photo: req.file ? req.file.filename : "",
  });

  //Now Write Data to json db
  writeFileSync(
    path.join(__dirname, "../db/product.json"),
    JSON.stringify(products)
  );
  //Redirect
  res.redirect("/products");
};
//Products Delete
const productsDelete = (req, res) => {
  //Get All Products Data
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/product.json"))
  );

  //Get Id
  const { id } = req.params;
  //New Products
  const newProducts = products.filter((data) => data.id != id);

  //Now Write Data to json db
  writeFileSync(
    path.join(__dirname, "../db/product.json"),
    JSON.stringify(newProducts)
  );
  //Redirect
  res.redirect("/products");
};

//Exports Controllers
module.exports = {
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
};
