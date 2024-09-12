import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";

import dotenv from "dotenv";
import dbConfig from "./Config/dbConfig.js";
// importing router variable from auth.js
import ProductRouter from "./Routes/ProductRoute.js";
import UserRouter from "./Routes/Auth.js";
import bodyParser from "body-parser";

const app = express();

// 3000 is react port number
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:4000"] }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// user data - frontend for registration and login
app.use("/users", UserRouter);
// product add - frontend dashboard to add product
app.use("/products", ProductRouter);

app.use(express.static("folder"));

dotenv.config();

dbConfig.dbConnection();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});

app.get("/", (req, res) => {
  res.send("get method");
});
