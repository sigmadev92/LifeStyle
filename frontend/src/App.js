import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// importing pages!
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import BestChoice from "./Pages/BestChoice";
import WishList from "./Pages/WishList";
import MyOrders from "./Pages/MyOrders";
import Cart from "./Pages/Cart";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import ForgotPassword from "./Pages/ForgotPassword";
import NOTAVAILABE from "./Pages/NOTAVAILABE";
import "./Style/app.css";
import ProductDetails from "./Pages/ProductDetails";
import TestRoute from "./Pages/TestRoute";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Token") !== null
  );
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("APP>JS LOGGED IN");
      axios
        .post("http://localhost:1008/users/auth-user", {
          loginID: localStorage.getItem("Token"),
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            setUserData(res.data.data);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => alert("Some error occured"));
    } else {
      console.log("hello");
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="App">
        {/* Router handles all routes within route */}
        {/* there is only 1 routes and handle many route */}

        <Router>
          {/* NavBar Component */}
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home userInfo={userData} />} />
              <Route
                path="/Register"
                element={isLoggedIn ? <Profile /> : <Register />}
              />
              <Route
                path="/Login"
                element={isLoggedIn ? <Profile /> : <Login />}
              />
              <Route
                path="/ForgotPassword"
                element={<ForgotPassword isLoggedIn />}
              />
              <Route
                path="/Profile"
                element={isLoggedIn ? <Profile /> : <Login />}
              />
              <Route path="/BestChoice" element={<BestChoice />} />
              <Route path="/WishList" element={<WishList />} />
              <Route
                path="/MyOrders"
                element={isLoggedIn ? <MyOrders /> : <Login />}
              />
              <Route path="/Cart" element={<Cart />} />
              <Route
                path="/ProductDetails/:Product_id"
                element={<ProductDetails />}
              />
              <Route path="/test-route" element={<TestRoute />} />
              <Route path="/*" element={<NOTAVAILABE />} />
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
