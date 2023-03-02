import React from 'react';
import Header from './components/Header';
import "./index.css";
import Home from './pages/Home';
import {Routes,Route} from "react-router-dom"
import Coin from './pages/Coin';
import {getTrendingCoin,getCoins} from "./features/trendingCoinSlice";
import {useSelector,useDispatch} from "react-redux";
import {getScreenWidth} from "./features/headerSlice";

function App() {
 const dispatch=useDispatch();
 const currencyRedux=useSelector((state:any)=>state.header.currency)
 const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
const screenWidth=useSelector((state:any)=>state.header.screenWidth);
const isChange=useSelector((state:any)=>state.header.isChange)


 React.useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [window]);

React.useEffect(()=>{
  dispatch(getScreenWidth({required:windowWidth}))
},[windowWidth,dispatch])

 React.useEffect(()=>{
   dispatch(getTrendingCoin(currencyRedux))
 },[dispatch,currencyRedux,isChange])

 React.useEffect(()=>{
  dispatch(getCoins(currencyRedux))
},[dispatch,currencyRedux,isChange])

 
  return (
    <div>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="coins/:id" element={<Coin/>}/>
  </Routes>
    </div>
  );
}

export default App;
