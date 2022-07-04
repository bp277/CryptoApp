import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Axios from "axios";
import Coin from "./components/Coin";
import Legend from "./components/Legend";
import CoinDetail from "./pages/CoinDetail";

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
        <Link to="/">
          <h1>CryptoApp</h1>
        </Link>
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
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Coin
                      name={coin.name}
                      icon={coin.icon}
                      price={coin.price}
                      symbol={coin.symbol}
                      rank={coin.rank}
                      priceChange1d={coin.priceChange1d}
                      id={coin.id}
                    />
                  </>
                }
              />
            </Routes>
          );
        })}
        <Routes>
          <Route path="/coin" element={<CoinDetail />}>
            <Route path=":coinId" element={<CoinDetail />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
