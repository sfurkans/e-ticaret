import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../redux/slice/AppSlice'
import productReducer from '../redux/slice/ProductSlice'
import sepetReducer from '../redux/slice/SepetSlice'



export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    sepet : sepetReducer,
  },
})

