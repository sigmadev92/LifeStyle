import React from "react";

export default function MyCard(props) {
  const details = props.info;
  const url = `http://localhost:1008/${details.ProductCategory}/`;
  return (
    <div className=" max-w-[200px] h-[300px] bg-violet-400 rounded-[10px] border-2 border-black mb-2">
      <div id="image" className="p-3 bg-yellow-200 rounded-[30px]">
        <img
          src={url + details.images[0]}
          alt={"Don't cry baby"}
          className="w-[170px] h-[120px] border-[3px] border-red-300"
        />
      </div>
      <div id="contents" className="bg-white">
        <h1 className="px-2 text-[14px] font-semibold font-mono">
          {details.Name}
        </h1>
        <h1 className="px-2 text-[12px] font-semibold font-mono bg-green-500 w-fit rounded-[10px] mx-2">
          {details.CountryOfOrigin}
        </h1>
        <div className="flex px-2 justify-between">
          <h1 className="text-[15px] text-green-700 font-semibold font-mono">
            USD {(100 - details.Discount) * 0.01 * details.Price}
          </h1>
          <h1 className=" text-[12px] text-green-700 font-semibold font-mono">
            Discount {details.Discount}%
          </h1>
        </div>
        <h1 className="px-1 text-[12px] font-semibold font-mono w-fit mx-2 text-red-500">
          {details.MaterialType}
        </h1>
        <h1 className="px-1 text-[12px] font-serif w-fit mx-1 line-clamp-3 ">
          {details.AboutItem}
        </h1>
      </div>
    </div>
  );
}

//Object { _id: "66e2cef4155a9512815e8c5f", Admin: "Devansh", ProductCategory: "Belt", … }
// ​​​
// AboutItem: "Pure Black shiny high heels made of USA based ACRYLIC material eye-catching comforting heels, Party wear and amazing looks"
// ​​​
// Admin: "Devansh"
// ​​​
// CountryOfOrigin: "USA"
// ​​​
// Discount: 10
// ​​​
// MaterialType: "Acrylic"
// ​​​
// Name: "Black High Heels"
// ​​​
// Price: 1000
// ​​​
// ProductCategory: "Belt"
// ​​​
// ProductId: "Belt-1726140148447"
// ​​​
// Rating: 3.5
// ​​​
// SizeOfProduct: 10
// ​​​
// StockAvailable: 10
// ​​​
// __v: 0
// ​​​
// _id: "66e2cef4155a9512815e8c5f"
// ​​​
// images: Array(4) [ "Bel
