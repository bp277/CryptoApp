import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import CoinDetail from '../pages/CoinDetail'


function Coin({ name, icon, price, symbol, rank, priceChange1d, id }) {
  const [isRed, setIsRed] = useState(false);

   
  useEffect(() => {
    setIsRed(priceChange1d < 0 ? true : false);
  }, [])  

  return (
    <Link to={`/coin/${id}`} element={<CoinDetail />} className="coin">
      <h3 className="rank">#{rank}</h3>
      <img src={icon} alt="icon" />
      <h1>{name}</h1>
      <h3>{symbol}</h3>
      <h3>{price.toFixed(2)}</h3>
      <h3 className={isRed ? 'red' : 'green'}>{priceChange1d}</h3>
    </Link>
  );
}

export default Coin;
