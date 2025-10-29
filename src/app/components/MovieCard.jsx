import React from "react";
import { Heart } from "lucide-react";

export default function MovieCard({ movie, isFavorite, onToggleFavorite, onShowDetails }) {
  const posterUrl = movie.Poster && movie.Poster !== "N/A" 
    ? movie.Poster 
    : "https://placehold.co/300x450/f3f4f6/9ca3af?text=No+Poster";

  return (
    <div className="group cursor-pointer">
      <div 
        className="relative w-full bg-gray-100 rounded-lg overflow-hidden mb-3"
        style={{ paddingBottom: '150%' }}
        onClick={() => onShowDetails(movie.imdbID)}
      >
        <img
          src={posterUrl}
          alt={movie.Title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-30 transition flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition text-sm font-light">
            View Details
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </button>
      </div>

      <div>
        <h3 className="font-normal text-sm mb-1 line-clamp-2">
          {movie.Title}
        </h3>
        <p className="text-gray-500 text-xs">{movie.Year}</p>
      </div>
    </div>
  );
}
