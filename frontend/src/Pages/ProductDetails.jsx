import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetails } from "../Api/Basic";

export default function ProductDetails() {
  // get id of the card clicked to fetch the details from the db

  // Use useSearchParams hook to get URL parameters
  const location = useLocation();
  // console.log("location : ", location);
  const ProductIdFromUrl = location.pathname.slice(16);
  // console.log(ProductIdFromUrl);

  // use state ->
  const [details, setDetails] = useState({});
  const [imgToBeDisplayed, setImage] = useState(null);

  // use effect -> fetching Product Details from database and displaying through use effect
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await getProductDetails(ProductIdFromUrl);
        if (response.status) {
          console.log("Single product data: ", response.data);
          setDetails(response.data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductDetails();
  }, [ProductIdFromUrl]); // Add ProductIdFromUrl as a dependency

  return (
    <div className="flex justify-center gap-[30px] p-[10px]">
      <div id="side" className="bg-slate-500">
        {details != null &&
          details.images !== undefined &&
          details.images.map((ele, index) => {
            return (
              <img
                src={`http://localhost:1008/${details.ProductCategory}/${ele}`}
                alt="products"
                key={index}
                className={`h-[100px] border-[3px] m-3 cursor-pointer hover:border-black ${
                  imgToBeDisplayed === ele && "border-red-400"
                }`}
                onClick={() => setImage(ele)}
              />
            );
          })}
      </div>
      <div
        id="main"
        className="w-[500px] h-[300px] border-lime-300 bg-black p-1"
      >
        {details && details.images !== undefined && !imgToBeDisplayed ? (
          <img
            src={`http://localhost:1008/${details.ProductCategory}/${details.images[0]}`}
            alt="products"
            className="w-full h-full "
          />
        ) : (
          <img
            src={`http://localhost:1008/${details.ProductCategory}/${imgToBeDisplayed}`}
            alt="products"
            className="w-full h-full "
          />
        )}
      </div>
    </div>
  );
}
