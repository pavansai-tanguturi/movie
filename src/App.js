import React, { useEffect, useState } from 'react';
import Moviecard from './Moviecard';
import MovieDetails from './MovieDetails';
import FavoriteMovies from './FavoriteMovies'; 
import './App.css';
import SearchIcon from './search.svg';

const API_ULR = 'http://www.omdbapi.com?apikey=b663386b';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); // Track selected movie
    const [searchTerm, setSearchTerm] = useState('');
    const [viewFavorites, setViewFavorites] = useState(false); // State to toggle viewing favorites

    const searchMovies = async (title) => {
        const response = await fetch(`${API_ULR}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    const handleMovieClick = (imdbID) => {
        setSelectedMovie(imdbID);
    };

    const handleGoBack = () => {
        setSelectedMovie(null);
    };

    const handleToggleView = () => {
        setViewFavorites(!viewFavorites); // Toggle between true and false
    };

    useEffect(() => {
        searchMovies('avengers');
    }, []);

    return (
        <div className="app">
            <h1>Chill Movies</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            <button className="button-favorite" onClick={handleToggleView}>
                {viewFavorites ? 'Back to Home' : 'View Favorite Movies'}
            </button>
            {selectedMovie ? (
                <MovieDetails imdbID={selectedMovie} goBack={handleGoBack} />
            ) : viewFavorites ? (
                <FavoriteMovies />
            ) : (
                <div className="container">
                    {movies?.length > 0 ? (
                        movies.map((movie) => (
                            <Moviecard
                                key={movie.imdbID}
                                movie={movie}
                                onClick={() => handleMovieClick(movie.imdbID)}
                            />
                        ))
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
