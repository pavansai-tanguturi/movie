"use client";
import React, { useState, useEffect } from "react";
import { Search, Heart, Star, Calendar, Clock, X } from "lucide-react";

const API_KEY = "b663386b";
const API_URL = "https://www.omdbapi.com/";

export default function MovieApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const loadInitialMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=life`);
        const data = await response.json();
        
        if (data.Response === "True") {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };
    
    loadInitialMovies();
  }, []);

  const searchMovies = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      // OMDB API only supports title search, so we search by title for both modes
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
    setLoading(false);
  };

  const getMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`,
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const toggleFavorite = (movie) => {
    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (imdbID) => {
    return favorites.some((fav) => fav.imdbID === imdbID);
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
    setShowFavorites(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const displayMoviesRaw = showFavorites ? favorites : movies;
  const displayMovies = Array.from(new Map(displayMoviesRaw.map(m => [m.imdbID, m])).values());

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-light tracking-wide">CINEMA</h1>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              <Heart
                className={`w-4 h-4 ${showFavorites ? "fill-current" : ""}`}
              />
              <span>{favorites.length}</span>
            </button>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search movies..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition text-sm font-medium"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-400 font-light">Loading...</div>
          </div>
        ) : (
          <>
            {showFavorites && favorites.length === 0 ? (
              <div className="text-center py-32">
                <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl text-gray-400 font-light">No favorites yet</h2>
                <p className="text-gray-400 mt-2 text-sm">
                  Start adding movies to your collection
                </p>
              </div>
            ) : displayMovies.length === 0 ? (
              <div className="text-center py-32">
                <h2 className="text-xl text-gray-400 font-light">No movies found</h2>
                <p className="text-gray-400 mt-2 text-sm">
                  Try a different search term
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {displayMovies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isFavorite={isFavorite(movie.imdbID)}
                    onToggleFavorite={toggleFavorite}
                    onShowDetails={getMovieDetails}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          isFavorite={isFavorite(selectedMovie.imdbID)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

function MovieCard({ movie, isFavorite, onToggleFavorite, onShowDetails }) {
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

function MovieDetailModal({ movie, isFavorite, onToggleFavorite, onClose }) {
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