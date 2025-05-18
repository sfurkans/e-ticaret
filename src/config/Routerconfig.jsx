import React from "react";
import { Routes,Route } from "react-router-dom";
import Home from '../pages/Home';
import Productdetails from "../components/Productdetails";

function Routerconfig () {
    return (
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path="/product-details/:id" element={<Productdetails />} />

        </Routes>
    )
}

export default Routerconfig
