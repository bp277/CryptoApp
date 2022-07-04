import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";
import Legend from "./components/Legend";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const [Search, setSearch] = useState("");

  const filteredCoins = listOfCoins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(Search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(Search.toLowerCase())
    );
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Bitcoin..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="cryptoDisplay">
        <Legend />
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
              rank={coin.rank}
              priceChange1d={coin.priceChange1d}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
