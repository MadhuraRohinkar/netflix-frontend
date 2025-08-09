import React from "react";
import { PlayCircle } from "lucide-react";

const MovieSlider = ({ title, movies }) => {
  return (
    <section className="mb-12 px-4">
      <h2 className="text-3xl font-bold text-white mb-5">{title}</h2>

      <div className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative w-44 min-w-[11rem] rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
          >
            <img
              src={movie.image}
              alt={movie.title}
              loading="lazy"
              className="w-full h-64 object-cover rounded-lg"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-end pb-4 px-2">
              <PlayCircle
                className="text-white hover:scale-110 transition-all mb-2"
                size={32}
              />
              <p className="text-white text-sm font-semibold text-center">
                {movie.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieSlider;
