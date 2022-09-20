import "./styles/main.css";
import logoImg from "./assets/logo-nlw.svg";
import { useState, useEffect } from "react";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/createAdBanner";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  // variable games will be an array of Games
  const [games, setGames] = useState<Game[]>([]);

  // dependecies array can be empty for fetch calls (cuz will run only once)
  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo NLW" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui!
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
              key={game.id}
            />
          );
        })}
      </div>

      <CreateAdBanner />
    </div>
  );
}

export default App;
