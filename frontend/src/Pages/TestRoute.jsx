import React, { useEffect, useState } from "react";
import axios from "axios";
export default function TestRoute() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1008/products/getImages")
      .then((response) => {
        console.log(response.data);
        if (response.data.status) setDetails(response.data.data);
        else console.log(response.data.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-center font-semibold">Test Route</h1>
      <button
        type="button"
        className="bg-green-400"
        onClick={() => console.log(details)}
      >
        Load Image
      </button>
      <br />
      {details != null &&
        details.map((detail, index) => {
          return (
            <img
              src={`http://localhost:1008/Shoes/${detail.images[0]}`}
              key={index}
              alt={`dinosaur${index}`}
            />
          );
        })}
    </div>
  );
}
