import React, { useEffect, useState } from "react";
import { getDetailsInCard } from "../Api/Basic";
import MyCard from "../Components/MyCard";
export default function Home(props) {
  // we use "useEffect" -> when any change occur in the browser.

  // array
  // const food = ["apple", "orange", "mango", "banana"];

  // making an empty object - React.useState ->
  const [details, SetDetails] = useState({});
  const [displayCategory, setDisplayCategory] = useState("All");
  const userDetails = props.userInfo;

  // useEffect --> auto fetching on loading pages
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Handle the response as needed
        const response = await getDetailsInCard();
        const infos = {};
        if (response.status) {
          // console.log("product detail -", response.data);
          Array.from(response.data).forEach((ele) => {
            if (infos[ele.ProductCategory] === undefined) {
              infos[ele.ProductCategory] = [ele];
            } else infos[ele.ProductCategory].push(ele);
          });

          console.log(infos);
          SetDetails(infos); // details - array of objects
        }
      } catch (error) {
        // Handle any errors
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // food.map();
  }, [displayCategory]); // Empty dependency array means it runs once after initial render.

  return (
    <div>
      {userDetails && (
        <h1 className="text-center font-serif">Hello {userDetails.FullName}</h1>
      )}
      {/* Search box */}
      <div className="flex justify-center items-center mt-4 mb-10">
        <div className="flex space-x-2 h-15 border border-gray-300 rounded-lg shadow-sm p-2 w-[90%] md:w-[600px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 text-blue-700 bg-transparent border-none focus:outline-none focus:ring-0"
          />
          <button className="bg-[#AD825C] h-10 w-15 p-2 text-white rounded-[10px] hover:bg-[#8C5A4F] transition-colors duration-300 ease-in-out ">
            Search
          </button>
        </div>
      </div>
      <div className="rounded-[20px] text-center bg-slate-600 text-red-400 mb-4 py-2 w-[80%] m-auto">
        <span className="text-[12px] font-semibold mx-2">Product Category</span>
        <select
          className="h-[25px] px-4 py-1 text-[12px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
          name="displayCategory"
          value={displayCategory}
          onChange={(e) => {
            setDisplayCategory(e.target.value);
          }}
        >
          {" "}
          <option value="All" className="text-gray-700">
            All
          </option>
          <option value="Shoes">Shoes</option>
          <option value="Bangles">Bangles</option>
          <option value="Belts">Belt</option>
          <option value="Earrings">Earrings</option>
          <option value="Handbags">Handbags</option>
          <option value="Ring">Ring</option>
          <option value="Scarves">Scarves</option>
          <option value="Wallets">Wallets</option>
          <option value="Watches">Watches</option>
        </select>
      </div>

      {/* slider */}

      {/* cards - foreach used to display card*/}

      {details != null && (
        <>
          <div className="w-[90%] m-auto bg-slate-950 h-full rounded-[20px]">
            {displayCategory === "All" ? (
              <>
                {Object.keys(details).map((field, index) => {
                  return (
                    <div key={index}>
                      <div className="flex justify-between p-3 text-yellow-200">
                        <h1>TOP {field === "Belt" ? "Belts" : field}</h1>
                        <h1>Show More</h1>
                      </div>
                      <div className="flex flex-wrap md:p-2 md:gap-x-2  bg-slate-300">
                        {details[field].slice(0, 4).map((product, index) => {
                          return (
                            <MyCard
                              info={{ product, userDetails }}
                              key={index}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="p-3 text-yellow-200">
                  <h1 className="text-center">
                    {displayCategory === "Belt" ? "Belts" : displayCategory}
                  </h1>
                </div>
                <div className="flex flex-wrap md:p-2 md:gap-x-[6px] bg-slate-300">
                  {details[displayCategory] !== undefined &&
                    details[displayCategory].map((product, index) => {
                      return (
                        <MyCard info={{ product, userDetails }} key={index} />
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* <h1>search box - left side and right side - wishlist</h1>
      <h1>carousel</h1>
      <h1>Best choice</h1>
      <h1>4 - cards - </h1>
      <h1>contact form - right and location - left</h1> */}
    </div>
  );
}
