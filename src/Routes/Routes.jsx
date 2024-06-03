import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Loyout/Main/Main";

import Home from "../Pages/Home/Home/Home";
import Apartment from "../Pages/Apartment/Apartment";
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import DeshBoard from "../Loyout/DeshBoard/DeshBoard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/apartment",
            element:<Apartment></Apartment>
        },
        {
            path:"/logIn",
            element:<LogIn></LogIn>
        },
        {
            path:"/register",
            element:<Register></Register>
        }
      ],
    },
    {
      path: "/deshBoard",
      element: <DeshBoard></DeshBoard>,
      children:[
        
      ]
    }
  ]);