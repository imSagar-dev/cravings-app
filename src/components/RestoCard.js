
import { CDN_URL } from "../utils/constants";
const RestoCard = (props)=>{
    const { name,avgRating , costForTwo,cloudinaryImageId,cuisines,areaName,locality,veg} = props.data;

    return (
        
                <div className='resto-card'>
                    <img alt="restaurant" src={CDN_URL+cloudinaryImageId} className='resto-img'/>
                    <h3>{name} {veg ? '🍅' : '🍗'}</h3>
                    {cuisines.join(', ')}
                    <div className='resto-features'>
                        <ul>
                            <li><h4>{avgRating} ⭐</h4></li>
                            <li><h4>{costForTwo}</h4></li>
                        </ul>
                    </div>
                    <div>
                        <span>{locality +"-"+areaName}</span>
                    </div>  
                </div>
            
    )
}

export default RestoCard;