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
  res.render("comet/index", {
    slider,
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
//Dashboard Page
const sliderCruds = (req, res) => {
  //Get Slider Data
  const slider = JSON.parse(
    readFileSync(path.join(__dirname, "../db/slider.json"))
  );
  res.render("dashboard/slider", {
    slider,
  });
};
//Dashboard Page
const clientsCruds = (req, res) => {
  res.render("dashboard/clients");
};
//Dashboard Page
const testimonialCruds = (req, res) => {
  res.render("dashboard/testimonial");
};
//Dashboard Page
const blogsCruds = (req, res) => {
  res.render("dashboard/blogs");
};
//Dashboard Page
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
  console.log(slider);
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
};
