// Routes is used to create api.

import express, { response } from "express";
import users from "../Models/Users.js";

const UserRouter = express.Router();

// router setup for register
UserRouter.post("/register", async (req, res) => {
  // used for debugging
  console.log("Register Reached here!!!!!!");
  console.log(req.body);

  // try-catch block -> checking the status of database if something issue occur -> it will give false and exist from the function
  try {
    // process -> checking email id and phone number already registered or not..using OR operator
    // mongodb query -> below query find one user from user (schema) and check email and phone number for verification
    const UserAlreadyExist = await users.findOne({
      $or: [{ Email: req.body.Email }, { PhoneNumber: req.body.PhoneNumber }],
    });

    // return function will exist lead to exist the function
    if (UserAlreadyExist === null) {
      req.body.Cart = {};
      req.body.WishList = {};
      const newUser = await users(req.body);
      newUser.save(); //saving data in db
      console.log("User registered successfully");
      // creating object and send it to the frontend
      return res.send({
        success: true,
        message: "User registered successfully",
      });
    }
    // if user already exist than below code will work!
    console.log("Email id Or Phone Number already registered");
    return res.send({ success: false, message: "User already exists!" });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Something went wrong in the database.",
    });
  }
});

// router setup for login
UserRouter.post("/login", async (req, res) => {
  console.log("Login Reached here!!!!!!");
  console.log(req.body);

  try {
    // process -> checking email id from user input and check in the database weather the email id  already exists or not.
    // LoginUserExist -> database checking and finding email that matches with frontend user input
    // FrontendReqLoginUserEmail -> email: req.body.email -> frontend user input
    const FrontendReqLoginUserEmail = { Email: req.body.Email };
    const LoginUserExist = await users.findOne(FrontendReqLoginUserEmail);

    // account already exist or not
    if (LoginUserExist === null) {
      console.log("User does not exist. Create an account!");
      return res.send({
        success: false,
        message: "User does not exist. Create an account!",
      });
    }

    // displaying email id coming from backend and matching it with the user input. -> just for debugging!
    console.log(LoginUserExist);

    // email id matching with password saved in the backend
    // LoginUserExist.Password -> backend password
    // req.body.Password -> user input password
    // token -> _id is the unique code generated in mongodb used to -> to locally store the active status of user which will further help in rendering the features of website like before and after login -> changes that occurs in home page and navbar.
    if (LoginUserExist.Password === req.body.Password) {
      if (LoginUserExist.WishLIst === undefined) LoginUserExist.WishList = [];
      if (LoginUserExist.Cart === undefined) LoginUserExist.Cart = [];
      console.log("Password match successfully!");
      return res.send({
        success: true,
        Token: LoginUserExist._id,
      });
    }
    // database password not equal to user input password
    response.send({
      success: false,
      message: "Password is Incorrect!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Opps! Database error!",
    });
  }
});

UserRouter.post("/auth-user", (req, res) => {
  console.log("reached at auth-user");
  console.log(req.body);

  users
    .findOne({ _id: req.body.loginID })
    .then((response) => {
      console.log(response);
      if (response)
        return res.send({
          status: true,
          data: response,
        });
      return res.send({
        status: false,
        message: "User is not logged in",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: false,
        message: "SOme Technical issue at our server",
      });
    });
});

UserRouter.post("/add-to-wishlist", (req, res) => {
  console.log(req.body);
  users
    .updateOne(
      { _id: req.body.userId },
      { $push: { WishList: req.body.productID } }
    )
    .then((response) => {
      console.log(response);
      res.send({
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: false,
      });
    });
});

UserRouter.post("/remove-from-wishlist", (req, res) => {
  console.log(req.body);
});
export default UserRouter;
