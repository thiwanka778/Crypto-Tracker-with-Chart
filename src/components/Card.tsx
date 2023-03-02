import React from 'react';
import "../index.css";
import millify from "millify";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {somethingChange} from "../features/headerSlice";
import {useDispatch} from "react-redux"


interface itemProps{
    item:any,
    
}
const Card = (props:itemProps) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const screenWidth=useSelector((state:any)=>state.header.screenWidth);
    const checkedRedux=useSelector((state:any)=>state.header.checked)
    const currencyRedux=useSelector((state:any)=>state.header.currency);
    let symbol:string="";
    if(currencyRedux==="USD"){
        symbol="$";
    }else if(currencyRedux==="EUR"){
        symbol="&euro;";
    }else if(currencyRedux==="LKR"){
        symbol="&#8360;";
    }

    const handleClick=()=>{
        navigate(`coins/${props.item.id}`)
        dispatch(somethingChange())
    }
  return (
    <div onClick={handleClick} className='card' style={{cursor:"pointer",background:checkedRedux===false?"white":"#454447",
       flexDirection:screenWidth>750?"row":"column",
      }}>


        <div className='card-a' style={{marginRight:screenWidth>750? "auto":"0px"}}>
        <img style={{width:screenWidth>750?"60px":"150px",marginRight:screenWidth>750?"20px":"20px"}} src={props.item.image} alt=""/>
        <div className='card-ba'>
            <p className='card-ca' style={{color:checkedRedux===false?"black":"white"}} >{props.item.symbol.toUpperCase()}</p>
            <p className='card-da' style={{color:checkedRedux===false?"black":"white"}} >{props.item.name}</p>
        </div>

        </div>

        <div style={{display:"flex",justifyContent:screenWidth>750?"none":"space-around",width:screenWidth>750?"fit-content":"100%",marginTop:screenWidth>750?"0px":"20px", flexDirection:screenWidth>522?"row":"column"}}>

        <div className='card-b' style={{marginTop:screenWidth>522?"0px":"10px"}}>
            <p className='card-c' style={{color:checkedRedux===false?"black":"white"}}>Price</p>
            <p className='card-d' style={{color:checkedRedux===false?"black":"white"}}><span dangerouslySetInnerHTML={{ __html: symbol }} ></span>&nbsp; {millify(props.item.current_price)}</p>
        </div>

        <div className='card-b' style={{marginTop:screenWidth>522?"0px":"20px",marginLeft:screenWidth>750?"70px":"0px"}}>
            <p className='card-c' style={{color:checkedRedux===false?"black":"white"}}>24h Change</p>
            <p className='card-d' style={{fontWeight:"600",color:props.item.price_change_percentage_24h>=0?"rgb(14,203,129)":"red"}}><span>{props.item.price_change_percentage_24h>=0?"+":""}</span>{props.item.price_change_percentage_24h.toFixed(2)}%</p>
        </div>

        <div className='card-b' style={{marginTop:screenWidth>522?"0px":"20px",marginLeft:screenWidth>750?"70px":"0px",marginBottom:screenWidth>522?"0px":"10px"}}>
            <p className='card-c' style={{color:checkedRedux===false?"black":"white"}}>Market Cap</p>
            <p className='card-d' style={{color:checkedRedux===false?"black":"white"}}><span dangerouslySetInnerHTML={{ __html: symbol }} ></span>&nbsp; {millify(props.item.market_cap)}</p>
        </div>

        </div>
        
      

        </div>
  )
}

export default Card