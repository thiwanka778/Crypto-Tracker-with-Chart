import React from 'react';
import Banner from '../components/Banner';
import "../index.css";
import { useSelector } from 'react-redux';
import Card from  "../components/Card";
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const Home = () => {
  const [value, setValue] = React.useState<string | null>(null);
  const checkedRedux=useSelector((state:any)=>state.header.checked)
  const coins=useSelector((state:any)=>state.trending.coins)
  const [page, setPage] = React.useState<number>(1);
let coinNames:string[]=[];
  if(coins && coins.length>0){
     coinNames=coins.map((item:any)=>{
      return item.name;
    })
  }
 
  const itemsPerPage=10; 

  const pageCount = Math.ceil(coins.length / itemsPerPage);
 
  const handlePageChange = (event:any, value:any) => {
    setPage(value);
  };
// let c:number=0;
let coinDisplay:any=[];
if(value===null){
  coinDisplay=coins.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item:any)=>{
    /*  const orderValue=itemsPerPage*(page-1)
      let order=orderValue;
       c=c+1;
       order=order+c */
  
       if(value===null){
        return (
          <Card key={item.id} item={item}  />
        )
       }
     
    })
}else if(value!==null){
  coinDisplay=coins.map((item:any)=>{
    if(value===item.name){
      return (
        <Card key={item.id} item={item}  />
      )
    }
   
  })
}
  

  return (
    <div style={{background:checkedRedux===false?"":"#161617"}} className='home'>
        <Banner/>
        <p style={{color:checkedRedux===false?"black":"white"}} className='home-title'>Cryptocurrency Prices by Market Cap</p>


        <div className='search'>
        <Autocomplete
      disablePortal
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      id="combo-box-demo"
      options={coinNames}
       size="small"
       sx={{ width:'90vw',
       '& .MuiAutocomplete-popupIndicator': {
        color: checkedRedux===false?"black":"white", // change the color of the Autocomplete drop-down arrow to red
      },
     }}
      renderInput={(params) => <TextField   
        sx={{
          '& .MuiFormLabel-root': {
            color:checkedRedux===false?"black":"white", // change the label color to red
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: checkedRedux===false?"black":'white', // change the border color to red
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: checkedRedux===false?"black":'white', // override the hover state to keep the border color red
          },
          '& .MuiAutocomplete-input': {
            color:checkedRedux===false?"black":"white", // change the color of the selected option text to red
          },
          '& .MuiAutocomplete-clearIndicator': {
            color: checkedRedux===false?"black":"white", // change the color of the clear indicator (cross mark) to red
          },
        
        }}
           {...params} label="Search For a Crypto Currency..." />}
    />
        </div>
        {coinDisplay}
       {value===null &&  <div className='pagination'>
        <Pagination  count={pageCount}
      color="primary"
      sx={{
        '& .MuiPaginationItem-root': {
          color:checkedRedux===false?"black":"white",
          fontWeight:"bold",
        },
        '& .Mui-selected': {
          backgroundColor:checkedRedux===false?"gray":'blue',
          '&:hover': {
            backgroundColor:'gray',
          },
        },
      }}
       page={page} onChange={handlePageChange} />
        </div>}
        
    </div>
  )
}

export default Home