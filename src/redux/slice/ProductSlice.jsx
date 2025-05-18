import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false
}

const BASE_URL = "https://fakestoreapi.com";


export const getallproducts = createAsyncThunk("getallproducts", async() => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
});

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        }
    },  
    extraReducers: (builder) => {
        builder.addCase(getallproducts.pending, (state) => {
            state.loading = true;  
        });

        builder.addCase(getallproducts.fulfilled, (state, action) => {
            state.loading = false;  
            state.products = action.payload;  
        });

        builder.addCase(getallproducts.rejected, (state) => {
            state.loading = false;  
        });
    }
});



export const  {setSelectedProduct} =productSlice.actions

export default productSlice.reducer;
