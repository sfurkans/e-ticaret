import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slice/ProductSlice";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "../css/Productdetails.css";
import { calculateSepet, addToSepet } from "../redux/slice/SepetSlice";

function Productdetails() {
    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product);
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);

    const product = selectedProduct || {};
    const { price, image, title, description } = product;

    useEffect(() => {
        if (products.length > 0) {
            const product = products.find((p) => p.id == id);
            if (product) {
                dispatch(setSelectedProduct(product));
            }
        }
    }, [products, id, dispatch]);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const addSepet = () => {
        if (count === 0) return;

        const payload = {
            id,
            price,
            image,
            title,
            description,
            count,
        };

        dispatch(addToSepet(payload));
        dispatch(calculateSepet());
    };

    // Ürün henüz seçilmediyse veya yüklenmediyse
    if (!product || Object.keys(product).length === 0) {
        return <div>Ürün yükleniyor...</div>;
    }

    return (
        <div className="ana-div">
            <div className="resim-div">
                <img src={image} alt={title} width={300} height={500} />
            </div>
            <div>
                <h1 className="title-div">{title}</h1>
                <p className="description-div">{description}</p>
                <h1 className="price-div">{price} ₺</h1>

                <div className="sayac-div">
                    <CiCirclePlus onClick={increment} className="arti-eksi" />
                    <span className="span-div">{count}</span>
                    <CiCircleMinus onClick={decrement} className="arti-eksi" />
                </div>
                <div>
                    <button onClick={addSepet} className="sepeteekle">
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Productdetails;
