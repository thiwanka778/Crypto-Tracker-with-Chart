import React from 'react'
import "../index.css";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';
import millify from 'millify';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
    const navigate=useNavigate();
    const currencyRedux=useSelector((state:any)=>state.header.currency)
const trendingCoins=useSelector((state:any)=>state.trending.trendingCoins)

let symbol:string="";

if(currencyRedux==='USD'){
     symbol="$";
}else if(currencyRedux==="EUR"){
    symbol="&euro;";
}else if(currencyRedux==="LKR"){
    symbol="&#8360;"
}

const items=trendingCoins?.map((item:any)=>{
    return (
        <div onClick={()=>navigate(`/coins/${item.id}`)} style={{width:"fit-content",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center"}} key={item.id}>
            <img   style={{width:"60px"}} src={item.image} alt=""/>

            <span style={{marginTop:"10px"}}>
                <span style={{color:"gold",fontSize:"14px"}}>{item.symbol.toUpperCase()}</span>
                &nbsp; &nbsp;
                <span style={{color:item.price_change_percentage_24h>=0?"rgb(14,203,129)":"red",fontWeight:"bold"}} >
              {item.price_change_percentage_24h>=0?"+":""}{item.price_change_percentage_24h.toFixed(2)}%
                </span>
            </span>
            <span style={{marginTop:"10px"}}>
                <span  dangerouslySetInnerHTML={{ __html: symbol }}></span> &nbsp; <span>{millify(item.current_price)}</span>
            </span>

        </div>
    )
})
    const responsive={
        0:{
            items:2,
        },
        708:{
            items:4,
        },
    }
  return (
    <div className='car' >
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
  autoPlay
  items={items}
        />
        </div>
  )
}

export default Carousel