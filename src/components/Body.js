import RestoCard from "./RestoCard";
import { useEffect, useState } from "react";
import { LIST_RESTAURANT_URL } from "../utils/constants";
import ShimmerRestoCard from "./ShimmerRestoCard";
import { Link } from "react-router-dom";

const Body = () => {
  console.log("Body loaded");
  const [resData, setResData] = useState([]);
  const [filteredData, setfilteredData] = useState(resData);

  const [clicked, setClicked] = useState(false);
  const fetchData = async () => {
    const res = await fetch(LIST_RESTAURANT_URL);
    const restaurantData = await res.json();
    const data = restaurantData?.data?.cards.filter(
      (r) => r.card?.card.id == "restaurant_grid_listing"
    );
    setResData(data[0]?.card?.card.gridElements?.infoWithStyle?.restaurants);
    setfilteredData(
      data[0]?.card?.card.gridElements?.infoWithStyle?.restaurants
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return resData.length === 0 ? (
    <ShimmerRestoCard />
  ) : (
    <div className="body-layout">
        <p className="location-heading">Restaurants with online food delivery in Pune</p>
      <div className="search-section">
        <input
          type="text" className="search-input"
          placeholder="Search Restaurant"
          onChange={(e) => {
            console.log("search item", e.target.value);
            let data = resData.filter((d) =>
              d.info?.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            if (e.target.value == "") {
              setfilteredData(resData);
            } else {
              setfilteredData(data);
            }
          }}
        />
        <button
          id="top-rated"
          className={clicked ? "top-rated-button focus" : "top-rated-button "}
          onClick={() => {
            setClicked((current) => !current);
            if(clicked){
                setfilteredData(resData);
            }else{
                let data = resData.filter((d) => d.info.avgRating > 4);
                setfilteredData(data);
                
            }
           
          }}
        >
          {clicked ? 'Top Rated Restaurant ❌':'Top Rated Restaurant'}
        </button>
        <button
          id="top-rated"
          className="top-rated-button"
          onClick={() => {
            let filterdData = resData.filter((d) => d.info.veg);
            setfilteredData(filterdData);
          }}
        >
          Veg Restaurant
        </button>
        <button
          id="top-rated"
          className="top-rated-button"
          onClick={() => {
            let filterdData = resData.filter((d) => !d.info.veg);
            setfilteredData(filterdData);
          }}
        >
          Non-Veg Restaurant
        </button>
        <button
          id="top-rated"
          className="top-rated-button"
          onClick={() => {
            setfilteredData(resData);
          }}
        >
          Remove Filters
        </button>
      </div>
      <div className="resto-card-section">
        {filteredData?.map((rest) => (
        <Link key={rest?.info?.id} to={"/restaurant/"+rest?.info?.id}> <RestoCard  data={rest?.info} /></Link> 
        ))}
      </div>
    </div>
  );
};

export default Body;
