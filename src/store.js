import { configureStore } from '@reduxjs/toolkit';
import headerReducer from "./features/headerSlice";
import trendingReducer from "./features/trendingCoinSlice";

export const store = configureStore({
reducer: {
header:headerReducer,
trending:trendingReducer,
},
});
