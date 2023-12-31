//
import express from "express";
import ejslayouts from "express-ejs-layouts";
import path from "path";
//const express = require("express");
import productcontroler from "./src/controlers/product.controler.js";
import vaildateRequest from "./src/middleware/validation.middleware.js";
const server = express();
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
//server.use(express.static("./src/views"));

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(ejslayouts);
const productcontroler1 = new productcontroler();
server.get("/", productcontroler1.getproducts);
server.get("/new", productcontroler1.getproductform);
server.get("/update-product/:id", productcontroler1.getUpdateProductView);
server.post("/delete-product/:id", productcontroler1.deleteProduct);
server.post("/", vaildateRequest, productcontroler1.addnewproducts);
server.post("/update-product", productcontroler1.updateproduct);

server.listen(3001, () => {
  console.log("hi");
});
