import React from 'react';
import "../index.css";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { getCurrency,getChecked } from '../features/headerSlice';
import {useDispatch,useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate()
    const dispatch=useDispatch();
    const checkedRedux=useSelector((state:any)=>state.header.checked)
    const currencyRedux=useSelector((state:any)=>state.header.currency)
  const [currency, setCurrency] = React.useState<string>(currencyRedux);
  const [checked, setChecked] = React.useState<boolean>(checkedRedux);

  
  const handleChangeCurrency = (event:any) => {
    setCurrency(event.target.value);
  };
  
  const handleChangeSwitch = (event: any) => {
    setChecked(event.target.checked);
  };

  React.useEffect(()=>{
   dispatch(getCurrency({required:currency}))
  },[currency,dispatch])

  React.useEffect(()=>{
    dispatch(getChecked({required:checked}))
   },[checked,dispatch])


  return (
    <nav className='nav' style={{background:checkedRedux===false?"#f2f4f7":"#434447"}}>
        <p onClick={()=>navigate("/")} className="app-title" style={{color:checkedRedux===false?"black":"white"}}>Crypto Tracker</p> 

        <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
        sx={{color:checkedRedux===false?"black":"white" ,
        background:checkedRedux===false?"white":"none",
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor:checkedRedux===false?"black":"white", // change the border color to red
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: checkedRedux===false?"black":"white", // override the hover state to keep the border color red
        },
        '& .MuiSelect-icon': {
          color:checkedRedux===false?"black":"white",  // change the color of the down arrow to red
        },
     }}
          value={currency}
          onChange={handleChangeCurrency}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
        
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"EUR"}>EUR</MenuItem>
          <MenuItem value={"LKR"}>LKR</MenuItem>
        </Select>
      </FormControl>
        </div>

        <div>
        <Switch
      checked={checked}
      onChange={handleChangeSwitch}
    />
        </div>



    </nav>
  )
}

export default Header