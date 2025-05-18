import React, { useEffect } from "react";
import Productlist from "../components/Productlist";
import Loading from "../components/Loading"; // Eğer loading state'i eklediyseniz
import { useSelector, useDispatch } from "react-redux";
import { getallproducts } from "../redux/slice/ProductSlice"; // Eğer ürünleri getiren action varsa

function Home () {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((store) => store.product);

    useEffect(() => {
        // products yoksa getallproducts çağrısı yapılır
        if (!products || products.length === 0) {
            dispatch(getallproducts());
        }
    }, [dispatch, products]);

    return (
        <div>
            {/* Yükleme durumu */}
            {loading && <Loading />}

            {/* Ürünler yoksa bir mesaj göster */}
            {products && products.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#888' }}>
                    Şu an listelenecek ürün bulunmamaktadır.
                </p>
            ) : (
                <Productlist />
            )}
        </div>
    );
}

export default Home;
