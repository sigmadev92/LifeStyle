// route setup

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// importing pages!
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./Style/app.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  var [isLoggedIn, setIsLoogedIn] = useState(
    localStorage.getItem("Admin") === "###1"
  );

  useEffect(() => {
    setIsLoogedIn(localStorage.getItem("Admin") === "###1");
  }, []);
  return (
    <>
      <div className="App">
        {/* Router handles all routes within route */}
        {/* there is only 1 routes and handle many route */}

        <Router>
          {/* NavBar Component */}
          <NavBar login={isLoggedIn} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home login={isLoggedIn} />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
              <Route
                path="/AddProducts"
                element={isLoggedIn ? <AddProducts /> : <Login />}
              />
              <Route path="/*" Component={NotFound} />
            </Routes>
          </div>
          {/* Footer Component */}
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
