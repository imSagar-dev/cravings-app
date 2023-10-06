import React from 'react';
import  ReactDOM  from 'react-dom/client';
import Header from './src/components/Header';
import Body from './src/components/Body';
import Footer from './src/components/Footer';
import { RouterProvider, createBrowserRouter , Outlet } from 'react-router-dom';
import About from './src/components/About';
import Error from './src/components/Error';
import RestaurantMenu from './src/components/RestaurantMenu';

import Header from './src/components/Header';


const ApplicationLayout = ()=>{//react component called
    return (
        <div>
           <Header/>
           <Outlet/>
           <Footer/>
        </div>
        )
   
    
}

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<ApplicationLayout/>,
        children:[
            {
                path:'/',
                element:<Body/>
            },
            {
                path:'/about',
                element:<About/>
            },
            {
                path:'/restaurant/:id',
                element:<RestaurantMenu/>
            }
           
        ],
        errorElement:<Error/>,
        
    }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);