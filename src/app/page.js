"use client";
import React, { useState, useEffect } from "react";
import { Search, Heart } from "lucide-react";
import MovieCard from "./components/MovieCard";
import MovieDetailModal from "./components/MovieDetailModal";

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