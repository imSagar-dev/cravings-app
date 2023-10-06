import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";
const useRestaurantInfo = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch(MENU_URL + resId);
        const resp = await res.json();
        setResInfo(resp.data);
    };
    return resInfo;
};

export default useRestaurantInfo;
