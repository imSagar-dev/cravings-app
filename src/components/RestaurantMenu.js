import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ShimmerRestoCard from "./ShimmerRestoCard";
import veg from "../assets/veg.png";
import nonVeg from "../assets/non-veg.png";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import { MENU_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const { id } = useParams();
  //   const restMenuData = useRestaurantInfo(id);

  const [resInfo, setResInfo] = useState(null); //orignal resp
  const [filteredMenus, setfilteredMenus] = useState(null);
  const [orignalList, setOrignalList] = useState(null);

  useEffect(() => {
    fetchData();
}, []);

  const fetchData = async () => {
    const res = await fetch(MENU_URL + id);
    const resp = await res.json();

    // code for group card
    const index =  resp.data.cards.findIndex((f) => f.groupedCard);

    const recommondedList = resp.data.cards[
      index
    ]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
      (c) => c?.card.card?.itemCards?.length > 0
    );
    setResInfo(resp.data);

    setfilteredMenus(recommondedList);
    setOrignalList(recommondedList);
    console.log("recommondedList data: ", recommondedList);
  };
  
  if (resInfo == null) {
    return <ShimmerRestoCard />;
  }

  //restaurant banner
  const { name, cuisines, areaName } = resInfo.cards[0].card.card.info;

  return (
    <>
    <details>
        <summary>This is the title of the details tag</summary>
        <p>Here's a paragraph inside a details element</p>
        Here's some text after the paragraph
</details>
    
    </>
  );
};
export default RestaurantMenu;
