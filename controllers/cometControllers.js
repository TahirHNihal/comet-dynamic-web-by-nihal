const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const { json } = require("express/lib/response");
const { title } = require("process");

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
  //Get Blogs Data
  const blogs = JSON.parse(
    readFileSync(path.join(__dirname, "../db/blog.json"))
  );
  //Get Client Data From DB
  const clients = JSON.parse(
    readFileSync(path.join(__dirname, "../db/client.json"))
  );
  res.render("comet/index", {
    slider,
    testimonials,
    blogs,
    clients,
  });
};
//About Page
const aboutPage = (req, res) => {
  res.render("comet/about");
};
//Shop Page
const shopPage = (req, res) => {
  //Get All Products Data
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/product.json"))
  );
  res.render("comet/shop", {
    products,
  });
};
//Single Shop Page
const shopsinglePage = (req, res) => {
  res.render("comet/shop-single");
};
//Contact Page
const contactPage = (req, res) => {
  res.render("comet/contact");
};


//Exports Controllers
module.exports = {
  homePage,
  aboutPage,
  shopPage,
  shopsinglePage,
  contactPage,
};
