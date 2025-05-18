import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallproducts } from "../redux/slice/ProductSlice";
import Product from "./Product";

function Productlist() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(getallproducts());
    }, [dispatch]);

    if (loading) {
        return <p style={{ textAlign: "center" }}>Ürünler yükleniyor...</p>;
    }

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>Hata: {error}</p>;
    }

    return (
        <div className="flex-row" style={{ flexWrap: "wrap", marginTop: "25px" }}>
            {products && products.length > 0 ? (
                products.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                <p style={{ margin: "auto" }}>Ürün bulunamadı.</p>
            )}
        </div>
    );
}

export default Productlist;
