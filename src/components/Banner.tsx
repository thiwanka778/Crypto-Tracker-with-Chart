import React from 'react';
import Carousel from './Carousel';
import "../index.css"
const Banner = () => {


  return (
    <div className="banner">
    <h1 className='banner-header'>Crypto Tracker</h1>
    <p className='banner-p'>Get All The Info Regarding Your Favorite Crypto Currency</p>
    <Carousel/>
    </div>
  )
}

export default Banner