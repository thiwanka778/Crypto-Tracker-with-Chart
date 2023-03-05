import React from 'react'
import "../index.css";
import { useParams } from "react-router-dom";
import { getHistory, getOneCoin } from '../features/trendingCoinSlice';
import { useSelector,useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale,// y axis
  PointElement,
  Tooltip,

} from "chart.js";


ChartJS.register(
   LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
  )



const Coin = () => {
  const dispatch=useDispatch();
  const loading=useSelector((state)=>state.trending.loading)
  const history=useSelector((state)=>state.trending.history)
  const currencyRedux=useSelector((state)=>state.header.currency)
  const oneCoin=useSelector((state)=>state.trending.oneCoin)
  const checkedRedux=useSelector((state)=>state.header.checked)
  const [days,setDays]=React.useState(1);
  const { id } = useParams();


  React.useEffect(()=>{
       dispatch(getOneCoin(id))
  },[id,currencyRedux]);


  React.useEffect(()=>{
     dispatch(getHistory({id:id,currency:currencyRedux.toLowerCase(),day:days}))
  },[id,currencyRedux,days]);




let symbol="";
  if(currencyRedux==='USD'){
    symbol="$";
}else if(currencyRedux==="EUR"){
   symbol="&euro;";
}else if(currencyRedux==="LKR"){
   symbol="&#8360;"
}

// chart code 

let coinPrice=[];
let coinTime=[];
let timeArray=[];


if(history && history.length>0){
  for(let i=0;i<history?.length;i++){
    let item=history[i];
    coinPrice.push(item[1])
    let m=moment(new Date(item[0])).format('YYYY MM DD')

    coinTime.push(m)

    let m1=moment(new Date(item[0])).format('h:mm:ss a')
    timeArray.push(m1)
  }
}




const data={
  labels:coinTime,
  datasets:[
    {
      
      data:coinPrice,
      borderColor:checkedRedux===false?"gray":"gold",
      fill:true,
      
    }
  ]
}


const options={
  plugins:{
    legend:true,
   
  },
  scales:{
    y:{
      // min:3,
     //  max:6
     grid: {
      display: false,
    },
    ticks: {
      beginAtZero: true,
      color:checkedRedux===false?"black":"white",
    },
    },
    x: {
      grid: {
        display: false,
        
      },
      ticks: {
        color: checkedRedux===false?"black":"white" // set the color of the y-axis labels
      }
    },
  },
  elements: {
    point: {
      radius: 0
    }
  }
}


const handleChangeCurrency = (event) => {
  setDays(event.target.value);
};

let pageLoading=false;
if(oneCoin){
  if(oneCoin?.id!==id){
    pageLoading=true;
  }
}



  return (
    <>
   {oneCoin.id===id ? <div className='coin-page' style={{background:checkedRedux===false?"white":"#161617"}}>
   
   <section style={{paddingLeft:"50px",paddingRight:"50px",paddingTop:"30px", display:"flex",flexDirection:"column",alignItems:"center",
  color:checkedRedux===false?"black":"white"}}>
    <img style={{width:"100px",marginBottom:"10px",}} src={oneCoin.image?.large} alt=""/>
    <p style={{fontWeight:"bold",letterSpacing:"2px",fontSize:"20px",marginBottom:"10px"}}>{oneCoin.name}</p>
    <p style={{marginBottom:"10px"}}>24h Change : <span 
    style={{color:oneCoin.market_data?.price_change_percentage_24h>=0?"rgb(14,203,129)":"red",fontWeight:"bold"}}
    >{oneCoin.market_data?.price_change_percentage_24h>=0?"+":""}{oneCoin.market_data?.price_change_percentage_24h}</span></p>
{currencyRedux==="USD" &&<p>Current Price : &nbsp;<span  dangerouslySetInnerHTML={{ __html: symbol }}></span>&nbsp; {oneCoin.market_data?.current_price?.usd}</p>}
{currencyRedux==="EUR" &&<p>Current Price : &nbsp;<span  dangerouslySetInnerHTML={{ __html: symbol }}></span>&nbsp; {oneCoin.market_data?.current_price?.eur}</p>}
{currencyRedux==="LKR" &&<p>Current Price : &nbsp;<span  dangerouslySetInnerHTML={{ __html: symbol }}></span>&nbsp; {oneCoin.market_data?.current_price?.lkr}</p>}

{oneCoin.description?.en && <div style={{marginTop:"30px",fontSize:"14px",letterSpacing:"2px",marginBottom:"20px",fontFamily:" 'Poppins', sans-serif",}}>
 <span dangerouslySetInnerHTML={{ __html:oneCoin.description?.en }}></span>
</div>}


   </section>

   {/* chart  */}

    <p style={{fontWeight:"bold",margin:"20px",fontFamily: "'Montserrat', sans-serif",letterSpacing:"2px",fontSize:"20px", color:checkedRedux===false?"black":"white"}}>
      {id.toUpperCase()} Price in {currencyRedux}</p>

  <div className='select-days'>
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
          value={days}
          onChange={handleChangeCurrency}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
        
          <MenuItem value={1}>24 Hours</MenuItem>
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={14}>14 Days</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
          <MenuItem value={180}>6 Months</MenuItem>
          <MenuItem value={365}>1 Year</MenuItem>
        </Select>
      </FormControl>
  </div>


  {loading===false?<section className='chart'>
   <Line
    data={data}
    options={options}
   />
  </section>:<div>
  <Backdrop
        sx={{ color:checkedRedux===false?"blue":'gold' }}
        open={loading}
      >
        <CircularProgress color="inherit" size={100} />
      </Backdrop>
    </div>}
 



    </div>:<div>
    <Backdrop
  sx={{ color:checkedRedux===false? 'blue':"gold"}}
  open={pageLoading}
  
>
  <CircularProgress color="inherit" size={300} />
</Backdrop>
      </div>}
    </>
  )
}

export default Coin