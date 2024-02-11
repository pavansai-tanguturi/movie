import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './Moviecard'; // Assume you have a MovieCard component for displaying movie details
import './FavoriteMovies.css';

const FavoriteMovies = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const promises = favorites.map(async (id) => {
                const response = await axios.get(
                    `http://www.omdbapi.com/?i=${id}&plot=full&apikey=b663386b`
                );
                return response.data;
            });
            const favoriteMoviesData = await Promise.all(promises);
            setFavoriteMovies(favoriteMoviesData);
        };

        fetchFavoriteMovies();
    }, []);

    return (
        <div className="favorite-movies-container">
            <h2>Favorite Movies</h2>
            <div className="favorite-movies">
                {favoriteMovies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default FavoriteMovies;
