import React, { useState } from "react";
import '../App.css';
import '../css/Header.css';
import { BsFillBasketFill } from "react-icons/bs";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from '../redux/slice/SepetSlice';

function Header () {
    const [theme, setTheme] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector((store) => store.sepet);

    const changeTheme = () => {
        const root = document.getElementById("root");
        if (theme) {
            root.style.backgroundColor = "black";
            root.style.color = "#fff";
        } else {
            root.style.backgroundColor = "#fff";
            root.style.color = "black";
        }
        setTheme(!theme);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px' }}>
            <div className="flex-row" onClick={() => navigate("/")}>
            <img className="logo" src="/logo.png" alt="Logo" />

                <p className="logo-text" style={{ marginLeft: '10px' }}>Kartal Yuvası</p>
            </div>
            <div className="flex-row">
                <input type="text" className="search-input" placeholder="Ara" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {theme ? <IoMoonSharp className="icon" onClick={changeTheme} /> : <MdOutlineLightMode className="icon" onClick={changeTheme} />}
                    <Badge onClick={() => dispatch(setDrawer())} badgeContent={products?.length || 0} color="error">
                        <BsFillBasketFill className="icon" />
                    </Badge>
                </div>
            </div>
        </div>
    );
}

export default Header;