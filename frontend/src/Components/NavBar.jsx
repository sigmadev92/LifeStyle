import React, { useState } from "react";
import "../Style/NavBar.css";
// importing images and storing it in img variable
import { useLocation, useNavigate } from "react-router-dom";
import img from "../images/LOGO.png";

export default function NavBar() {
  const Navigate = useNavigate();
  const location = useLocation();
  const endPoint = location.pathname;
  const classNameLi =
    "NavBar-li text-[15px] hover:text-amber-950 ease-in-out duration-200";
  // before and after login setup
  const [LoggedIn, setLoggedIn] = useState(
    localStorage.getItem("Token") !== null
  );

  return (
    // Login/register || Links -> #AD825C
    <div className="NavBar bg-[#AD825C] flex justify-between px-8 shadow-sm shadow-slate-400 sticky top-0">
      <div className="NavBar-Logo text-[#FFFFFF] cursor-pointer flex gap-5 transition-colors  ">
        {/* logo */}

        <img
          src={img}
          alt="logo"
          className="w-[50px] bg-center h-[50px] rounded-full"
          width={20}
          height={20}
        />

        {/* name */}
        <h1 className="text-xl font-semibold md:text-4xl mt-1 hover:text-[40px] hover:text-amber-950 ease-in-out duration-200">
          LifeStyle!
        </h1>
      </div>

      <div className="NavBar-Links text-[#FFFFFF] cursor-pointer  ">
        <ul className="NavBar-ul flex gap-8 font-semibold mt-2">
          <li
            key={"home"}
            className={`${classNameLi} ${
              endPoint === "/" && "bg-slate-800 p-1 text-[10px]"
            }`}
            onClick={() => {
              Navigate("/");
              console.log(endPoint);
            }}
          >
            Home
          </li>

          {/* conditional rending -> logged in true -> display login will disappear and Profile button will display */}
          {/* loggedIn -> (true -> profile ) AND (false -> Login ) will appear -> ternary operator*/}
          {/* {LoggedIn ? Profile : Login} */}

          {LoggedIn ? (
            <>
              <li
                className={`${classNameLi} ${
                  endPoint === "/Profile" && "bg-slate-800 p-1 text-[10px]"
                }`}
                onClick={() => Navigate("/Profile")}
                key={"profile"}
              >
                Profile
              </li>
              {/* in logout section -> local storage -> null -> setLoggedIn-> value changes  */}
              <li
                className={classNameLi}
                key={"logout"}
                onClick={() => {
                  localStorage.removeItem("Token");
                  setLoggedIn(false);
                  Navigate("/login");
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <li
              className={`${classNameLi} ${
                endPoint === "/login" && "bg-slate-800 p-1 text-[10px]"
              }`}
              key="login"
              onClick={() => {
                Navigate("/login");
                // Refresh the page after logging out
              }}
            >
              Login
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
