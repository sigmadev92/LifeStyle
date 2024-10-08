// importing express
import express, { response } from "express";
// importing schema
import Product from "../Models/ProductModel.js";
// used to upload images in the 3rd party application "multer" -> it is an api used to help to store image in the backend.
import multer from "multer";
import fs from "fs";
import { log } from "console";
const ProductRouter = express.Router();

// multer -
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const arra1 = Array.from(file.originalname.split("-"));
    return cb(null, `./folder/${arra1[0]}`);
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

// schema type -> passing as an object -> multer syntax
const uploadImage = multer({ storage: Storage });

// backend table name /AddProduct known as endpoint
ProductRouter.post(
  "/AddProduct",
  uploadImage.array("files", 6),
  async (req, res) => {
    console.log("Reached Add Product route");
    console.log(req.body.ProductId);
    console.log(req.files);

    const imgNames = [];
    Array.from(req.files).forEach((image) => {
      imgNames.push(image.filename);
    });
    req.body.images = imgNames;
    try {
      const newProduct = await Product(req.body);
      newProduct.save();
      console.log("Product added successfully.");

      // creating object and send it to the frontend
      return res.send({
        status: true,
        message: "Product added successfully.",
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        message: "Something went wrong in the database.",
      });
    }
  }
);

ProductRouter.get("/fetchProducts", async (req, res) => {
  console.log("fetching product");

  try {
    const details = await Product.find({ Admin: "Devansh" });
    if (details == null) {
      console.log("No products in the database");
      return res.send({ status: false, message: "Product DataBase is empty" });
    } else {
      console.log("fetched product details");
      return res.send({ status: true, data: details });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: error.message });
  }
});

ProductRouter.get("/ProductDetails/:Product_id", async (req, res) => {
  console.log("Fetching single product");
  console.log(req.params);

  try {
    //calling model
    console.log("Single product id :", req.params.Product_id);
    const detailsOfSingleProduct = await Product.findOne({
      _id: req.params.Product_id,
    });

    if (detailsOfSingleProduct != null) {
      console.log(detailsOfSingleProduct.images);

      return res.send({ status: true, data: detailsOfSingleProduct });
    } else {
      return res.send({ status: false, message: "Invalid URL" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: "Database connectivity issue!" });
  }
});

ProductRouter.get("/getImages/", (req, res) => {
  Product.find()
    .then((products) => {
      res.send({
        status: true,
        data: products,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.send({
        status: false,
        message: err.message,
      });
    });
});
export default ProductRouter;
