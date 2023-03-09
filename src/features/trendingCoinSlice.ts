import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    trendingCoins:[],
    loading:false,
    coins:[],
    oneCoin:{},
    history:[],
};

export const getOneCoin:any = createAsyncThunk(
    'get/Onecoins',
    async (coin:any, thunkAPI) => {
      try {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        };
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`,config);
        return response.data;
      } catch (error:any) {
        
      }
    }
  );

export const getCoins:any = createAsyncThunk(
    'get/coins',
    async (currency:any, thunkAPI) => {
      try {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        };
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,config);
        return response.data;
      } catch (error:any) {
        
      }
    }
  );

export const getTrendingCoin:any = createAsyncThunk(
    'get/trendingCoin',
    async (currency:any, thunkAPI) => {
      try {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        };
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=20&page=1&sparkline=false`,config);
        return response.data;
      } catch (error:any) {
        
      }
    }
  );


  export const getHistory:any = createAsyncThunk(
    'get/history',
    async (option:any,thunkAPI) => {
      try {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        };
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${option.id}/market_chart?vs_currency=${option.currency}&days=${option.day}`,config);
        return response.data;
      } catch (error:any) {
        
      }
    }
  );

const trendingCoinSlice:any = createSlice({
name: 'trending',
initialState,

reducers:{
   
},
extraReducers: (builder:any) => {
    builder
      .addCase(getTrendingCoin.pending, (state:any) => {
        state.loading=true;
      })
      .addCase(getTrendingCoin.fulfilled, (state:any, action:any) => {
       state.loading=false;
       state.trendingCoins=action.payload;
       
      })
      .addCase(getTrendingCoin.rejected, (state:any, action:any) => {
        state.loading=false;
      })

      .addCase(getCoins.pending, (state:any) => {
        state.loading=true;
      })
      .addCase(getCoins.fulfilled, (state:any, action:any) => {
       state.loading=false;
       state.coins=action.payload;
       
      })
      .addCase(getCoins.rejected, (state:any, action:any) => {
        state.loading=false;
      })

      .addCase(getOneCoin.pending, (state:any) => {
        state.loading=true;
      })
      .addCase(getOneCoin.fulfilled, (state:any, action:any) => {
       state.loading=false;
       state.oneCoin=action.payload;
       
      })
      .addCase(getOneCoin.rejected, (state:any, action:any) => {
        
      })

// history
      .addCase(getHistory.pending, (state:any) => {
        state.loading=true;
      })
      .addCase(getHistory.fulfilled, (state:any, action:any) => {
       state.loading=false;
       state.history=action.payload?.prices;
       
      })
      .addCase(getHistory.rejected, (state:any, action:any) => {
        state.loading=false;
      })
  },

});

export default trendingCoinSlice.reducer;