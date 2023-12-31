import path from "path";
import ProductModel from "../models/product.models.js";
import { error } from "console";

export default class productcontroler {
  getproducts(req, res) {
    let products = ProductModel.get();
    console.log(products);
    res.render("index", { products: products });
    // console.log(path.resolve());
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "index.html")
    // );
  }

  getproductform(req, res) {
    return res.render("new-product", { errorMessage: null });
  }
  // addnewproducts(req, res, next) {
  //   res.render("new-product", { errorMessage: null });
  // }

  addnewproducts(req, res, next) {
    const { name, price, imageUrl } = req.body;
    let errors = [];
    if (!name || name.trim() == "") {
      errors.push("Name is required");
    }
    if (!price || parseFloat(price) < 1) {
      errors.push("Price must be a positive value");
    }
    try {
      const validUrl = new URL(imageUrl);
    } catch (err) {
      errors.push("URL is invalid");
    }

    if (errors.length > 0) {
      return res.render("new-product", {
        errorMessage: errors[0],
      });
    }
    console.log(req.body);
    ProductModel.add(req.body);
    let products = ProductModel.get();
    res.render("index", { products: products });
  }

  getUpdateProductView(req, res, next) {
    // 1. if product exists then return view
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }
    // 2. else return errors.
    else {
      res.status(401).send("Product not found");
    }
  }

  updateproduct(req, res) {
    ProductModel.update(req.body);
    let products = ProductModel.get();
    res.render("index", { products: products });
  }
  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    // if (!productFound) {
    //   res.status(401).send("Product not found");
    // }
    let products = ProductModel.get();

    ProductModel.delete(id);
    res.render("index", { products });
  }
}
