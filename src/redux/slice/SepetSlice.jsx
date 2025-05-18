import { createSlice } from '@reduxjs/toolkit'

const getSepetFromStorage = () => {
    if (localStorage.getItem("sepet")) {
        return JSON.parse(localStorage.getItem("sepet"));
    }
    return [];
}

const initialState = {
    products: getSepetFromStorage(),
    drawer: false,
    totalAmount: 0
}

const writeFromSepetToStorage = (sepet) => {
    localStorage.setItem("sepet", JSON.stringify(sepet));
}

export const sepetSlice = createSlice({
    name: "sepet",
    initialState,
    reducers: {
        addToSepet: (state, action) => {
            const findProduct = state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                // Önceden eklenmişse, miktarını güncelle
                state.products = state.products.map((product) =>
                    product.id === action.payload.id
                        ? { ...product, count: product.count + action.payload.count }
                        : product
                );
            } else {
                // İlk defa ekleniyorsa
                state.products = [...state.products, action.payload];
            }
            writeFromSepetToStorage(state.products);
        },
        removeFromSepet: (state, action) => {
            // Sepetten ürünü sil
            state.products = state.products.filter((product) => product.id !== action.payload.id);
            writeFromSepetToStorage(state.products); // Sepeti güncelle
        },
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        calculateSepet: (state) => {
            // Sepetin toplam tutarını hesapla
            state.totalAmount = state.products.reduce((total, product) => {
                return total + (product.price * product.count);
            }, 0);
        }
    }
})

export const { addToSepet, removeFromSepet, setDrawer, calculateSepet } = sepetSlice.actions;

export default sepetSlice.reducer;
