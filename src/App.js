import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Coins from "./components/Coins";
import Coin from "./routes/Coin";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      axios
        .get(url)
        .then((response) => {
          setCoins(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Coins coins={coins} />} />
          <Route path="/coin" element={<Coin />}>
            <Route path=":coinId" element={<Coin />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
