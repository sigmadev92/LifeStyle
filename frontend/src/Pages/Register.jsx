import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/RegisterLoginForgotPassword.css";
import { RegisterUser } from "../Api/Basic";

export default function Register() {
  const Navigate = useNavigate();

  // sending data in the backend -> using states and hooks
  //  initial state -> Initially setting variables names as empty which will be further given input by user and send it to backend.
  const [FormData, SetFormData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    Password: "",
    ConfirmPassword: "",
  });

  // assigning values to form data -> input made by user is save in the form data.
  const { FullName, Email, PhoneNumber, Address, Password, ConfirmPassword } =
    FormData;

  // hooks implementation -> html page rendering by setFormData
  function HandleChange(event) {
    // console.log(event.target.value);
    // console.log("vj");
    SetFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  // onClick event activated
  async function HandleSubmit(event) {
    event.preventDefault();

    // password = confirm password
    if (Password !== ConfirmPassword) {
      alert("Password and confirm password does not match!");
      Navigate("/register");
      return;
    }

    // data sent to the database if password = confirm password
    // some other issue handling -> like network issue thats why using try catch block!
    console.log(FormData);
    try {
      const response = await RegisterUser(FormData);
      if (response.success) {
        alert("Registered Successfully!");
        Navigate("/login");
      } else {
        alert(
          "Email id Or Phone Number already registered. " + response.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // forgot password and login link
    <div className="background-image pt-[20px] ">
      <div className="container w-[80%] md:w-[300px] border-2 border-white bg-[#AD825C]">
        <h1 className="text-[15px] mt-[-10px] text-center font-serif ">
          Registration Form
        </h1>
        <div className="form-transparent">
          <form className="">
            {/* name */}
            <input
              placeholder="Full Name"
              name="FullName"
              value={FullName}
              onChange={HandleChange}
              type="text"
              className="w-full mb-3 text-[12px] text-yellow-800 font-semibold px-3 py-1 bg-white  border-black border-2 rounded transition ease-in-out placeholder:font-mono placeholder:text-violet-400"
              required
            />
            {/* Email */}
            <input
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={HandleChange}
              type="email"
              className="w-full mb-3 text-[12px] text-yellow-800 font-semibold px-3 py-1 bg-white  border-black border-2 rounded transition ease-in-out placeholder:font-mono placeholder:text-violet-400"
              required
            />

            {/* Phone Number */}
            <input
              placeholder="Phone Number"
              name="PhoneNumber"
              value={PhoneNumber}
              onChange={HandleChange}
              type="number"
              className="w-full mb-3 text-[12px] text-yellow-800 font-semibold px-3 py-1 bg-white  border-black border-2 rounded transition ease-in-out placeholder:font-mono placeholder:text-violet-400"
              minLength={10}
              required
            />

            {/* Address */}
            <input
              placeholder="Address"
              name="Address"
              value={Address}
              onChange={HandleChange}
              type="text"
              className="w-full mb-3 text-[12px] text-yellow-800 font-semibold px-3 py-1 bg-white  border-black border-2 rounded transition ease-in-out placeholder:font-mono placeholder:text-violet-400"
              required
            />

            {/* Password */}
            <input
              placeholder="Password"
              name="Password"
              value={Password}
              onChange={HandleChange}
              type="password"
              className="w-full mb-3 text-[12px] text-yellow-800 font-semibold px-3 py-1 bg-white  border-black border-2 rounded transition ease-in-out placeholder:font-mono placeholder:text-violet-400"
              required
            />

            {/*Confirm password */}
            <input
              placeholder="Confirm Password"
              name="ConfirmPassword"
              value={ConfirmPassword}
              onChange={HandleChange}
              type="password"
              className="w-full text-[12px] text-yellow-800 font-semibold px-3 py-1 bg-white  border-black border-2 rounded transition ease-in-out placeholder:font-mono placeholder:text-violet-400"
              required
            />

            <span className="cursor-pointer hover:text-white text-[12px] text-red-500 font-serif">
              <Link to="/login">Already Have an Account? Login </Link>
            </span>

            {/* Submit Button */}
            <button
              className="w-full bg-[#74512D] text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-black transition duration-150 ease-in-out hover:shadow-lg active:bg-[#543310]"
              type="Submit"
              onClick={HandleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
