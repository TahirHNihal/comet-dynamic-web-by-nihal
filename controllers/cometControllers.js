const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const { json } = require("express/lib/response");

//Home Page
const homePage = (req, res) => {
  //Get Slider Data
  const slider = JSON.parse(
    readFileSync(path.join(__dirname, "../db/slider.json"))
  );
  //Get All Testimonial Data
  const testimonials = JSON.parse(
    readFileSync(path.join(__dirname, "../db/testimonial.json"))
  );
  res.render("comet/index", {
    slider,
    testimonials,
  });
};
//About Page
const aboutPage = (req, res) => {
  res.render("comet/about");
};
//Shop Page
const shopPage = (req, res) => {
  res.render("comet/shop");
};
//Single Shop Page
const shopsinglePage = (req, res) => {
  res.render("comet/shop-single");
};
//Contact Page
const contactPage = (req, res) => {
  res.render("comet/contact");
};
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
//Clients Cruds Page
const clientsCruds = (req, res) => {
  res.render("dashboard/clients");
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
  res.render("dashboard/blogs");
};
//Products Cruds Page
const productsCruds = (req, res) => {
  res.render("dashboard/products");
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

//Exports Controllers
module.exports = {
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
  sliderupdateCruds,
  sliderEditCruds,
  testimonialForm,
  testimonialDelete,
  testimonialUpdate,
  testimonialEditCruds,
};
