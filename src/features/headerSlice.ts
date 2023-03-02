import { createSlice } from '@reduxjs/toolkit';

const lc=window.localStorage.getItem("currency")
const lchecked=window.localStorage.getItem("checked")

const initialState = {
    currency:lc?JSON.parse(lc):"USD",
    checked:lchecked?JSON.parse(lchecked):false,
    screenWidth:0,
    isChange:0,
};

const headerSlice:any = createSlice({
name: 'header',
initialState,

reducers:{
    getCurrency:(state:any,action:any)=>{
        state.currency=action.payload.required;
        window.localStorage.setItem("currency",JSON.stringify(state.currency))
    },
    getChecked:(state:any,action:any)=>{
        state.checked=action.payload.required;
        window.localStorage.setItem("checked",JSON.stringify(state.checked))
    },
    getScreenWidth:(state:any,action:any)=>{
       state.screenWidth=action.payload.required;
    },
    somethingChange:(state:any)=>{
      state.isChange=state.isChange+1;
    }
},

});
export const {getCurrency,getChecked,getScreenWidth,somethingChange} =headerSlice.actions;
export default headerSlice.reducer;
