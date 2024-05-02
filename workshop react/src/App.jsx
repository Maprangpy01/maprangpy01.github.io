import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import ReactLoading from 'react-loading';

import FavPoke from "./components/FavPoke";
function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Someting went wrong", error);
      } finally {
        setLoading(false);
      }
    };
    loadPoke();

    return () => abortController.abort();
  }, [number]);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  };

  console.log("favPoke", fav);
  console.log(loading);
  // console.log(poke.abilities);
  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ?
          <div className="flex h-full justify-center items-center">
            <ReactLoading type="spin" color="black" height={'20%'} width={'20%'} /></div>
           : 
            <>
              <h1 className="text-3xl font-bold underline">{poke?.name}</h1>
              <button onClick={addFav}>Add to Favourite</button>
              <br />
              <img
                src={poke?.sprites?.other?.home.front_default}
                alt={poke?.name}
              />
              <ul>
                {poke?.abilities?.map((abil, idx) => (
                  <li key={idx}>{abil.ability.name}</li>
                ))}
              </ul>
              <button onClick={prevPoke}>Prev</button>
              <button onClick={nextPoke}>Next</button>
            </>
          }
        </div>
        <div>
          <h2>Your favourite pokemon</h2>
          {fav.length > 0 ? <FavPoke fav={fav} /> : <div className="flex h-full justify-center items-center"><p>No favourite Pokemon</p></div>}
          
        </div>
      </div>
    </div>
  );
}

export default App;
