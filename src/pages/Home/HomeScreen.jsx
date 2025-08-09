// src/pages/Home/HomeScreen.jsx
import React, { useEffect,useState } from "react";
import MovieSlider from "./MovieSlider";
import useMoviestore from "../../store/Moviestore"

const trendingMovies = [
  { title: "Squid Game", image: "/squidgame.jpg" },
  { title: "Stranger Things", image: "/stranger-things.png" },
  { title: "Wednesday", image: "/wednesday.jpg" },
  { title: "King the Land", image: "/kingtheland.jpg" },
  { title: "Money Heist", image: "/moneyheist.jpg" },
  { title: "Extraction", image: "/extraction.jpg" },
  { title: "Emily", image: "/emily.jpg" },
  { title: "All of Us Are Dead", image: "/all.jpg" },
  { title: "Mismatched", image: "/Mismatched.jpg" },
  { title: "The Witcher", image: "/Witcher.jpg" },
];

const topPicks = [
  { title: "Wednesday", image: "/wednesday.jpg" },
  { title: "King the Land", image: "/kingtheland.jpg" },
  { title: "Money Heist", image: "/moneyheist.jpg" },
  { title: "The Witcher", image: "/Witcher.jpg" },
  { title: "Mismatched", image: "/Mismatched.jpg" },
  { title: "Squid Game", image: "/squidgame.jpg" },
  { title: "Stranger Things", image: "/stranger-things.png" },
];

const popularMovies = [
  { title: "All of Us Are Dead", image: "/all.jpg" },
  { title: "Mismatched", image: "/Mismatched.jpg" },
  { title: "The Witcher", image: "/Witcher.jpg" },
  { title: "Extraction", image: "/extraction.jpg" },
  { title: "Money Heist", image: "/moneyheist.jpg" },
  { title: "Emily", image: "/emily.jpg" },
  { title: "Squid Game", image: "/squidgame.jpg" },
];

const HomeScreen = () => {
  const {key,getTrendingVideos} = useMoviestore()
  const [TrendingVideos, setTrendingVideos] = useState({})

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      const result = await getTrendingVideos()
      console.log(result)
      if(result.success){
        setTrendingVideos(result.movie)
      }
    }
    fetchTrendingVideos()
  }, [key])

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Banner */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        <img
          src= {`https://image.tmdb.org/t/p/original${TrendingVideos.backdrop_path}`}
          alt="Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white space-y-4">
          <h1 className="text-5xl font-bold">{TrendingVideos.title || TrendingVideos.name}</h1>
          <p className="max-w-xl text-lg">
            {TrendingVideos.overview}
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
            Play
            </button>
            <button className="bg-gray-700 text-white px-6 py-2 rounded font-semibold hover:bg-gray-600 transition">More Info</button>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="p-6">
        <MovieSlider title="Trending Now" movies={trendingMovies} />
        <MovieSlider title="Top Picks For You" movies={topPicks} />
        <MovieSlider title="Popular on Netflix" movies={popularMovies} />
      </div>
    </div>
  );
};

export default HomeScreen;
