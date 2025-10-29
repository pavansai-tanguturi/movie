import React from "react";
import { Heart, Star, Calendar, Clock, X } from "lucide-react";

export default function MovieDetailModal({ movie, isFavorite, onToggleFavorite, onClose }) {
  const posterUrl = movie.Poster && movie.Poster !== "N/A"
    ? movie.Poster
    : "https://placehold.co/300x450/f3f4f6/9ca3af?text=No+Poster";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-10 p-10">
            <div className="flex-shrink-0">
              <img
                src={posterUrl}
                alt={movie.Title}
                className="w-full md:w-80 rounded-lg shadow-lg"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-light mb-4">{movie.Title}</h2>

              <div className="flex items-center gap-6 mb-6 flex-wrap">
                {movie.imdbRating !== "N/A" && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{movie.imdbRating}</span>
                    <span className="text-gray-400 text-sm">/10</span>
                  </div>
                )}

                {movie.Year && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{movie.Year}</span>
                  </div>
                )}

                {movie.Runtime !== "N/A" && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{movie.Runtime}</span>
                  </div>
                )}
              </div>

              {movie.Genre !== "N/A" && (
                <div className="flex gap-2 mb-6 flex-wrap">
                  {movie.Genre.split(", ").map((genre, i) => (
                    <span
                      key={i}
                      className="px-4 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => onToggleFavorite(movie)}
                className="px-6 py-3 rounded-full flex items-center gap-2 transition mb-8 border text-sm"
                style={{
                  backgroundColor: isFavorite ? "#fee2e2" : "#f9fafb",
                  borderColor: isFavorite ? "#fca5a5" : "#e5e7eb",
                  color: isFavorite ? "#dc2626" : "#374151",
                }}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </button>

              {movie.Plot !== "N/A" && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">Synopsis</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{movie.Plot}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {movie.Director !== "N/A" && (
                  <div>
                    <span className="text-gray-500 block mb-1">Director</span>
                    <p className="text-gray-900">{movie.Director}</p>
                  </div>
                )}

                {movie.Actors !== "N/A" && (
                  <div>
                    <span className="text-gray-500 block mb-1">Cast</span>
                    <p className="text-gray-900">{movie.Actors}</p>
                  </div>
                )}

                {movie.Writer !== "N/A" && (
                  <div>
                    <span className="text-gray-500 block mb-1">Writer</span>
                    <p className="text-gray-900">{movie.Writer}</p>
                  </div>
                )}

                {movie.Language !== "N/A" && (
                  <div>
                    <span className="text-gray-500 block mb-1">Language</span>
                    <p className="text-gray-900">{movie.Language}</p>
                  </div>
                )}

                {movie.Country !== "N/A" && (
                  <div>
                    <span className="text-gray-500 block mb-1">Country</span>
                    <p className="text-gray-900">{movie.Country}</p>
                  </div>
                )}

                {movie.Awards !== "N/A" && (
                  <div>
                    <span className="text-gray-500 block mb-1">Awards</span>
                    <p className="text-gray-900">{movie.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
