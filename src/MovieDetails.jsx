import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieDetails.css'; // Import CSS file for styling

const MovieDetails = ({ imdbID, goBack }) => {
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false); 

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=b663386b`
                );
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [imdbID]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(imdbID));
    }, [imdbID]);

    
    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (isFavorite) {
            
            const updatedFavorites = favorites.filter((id) => id !== imdbID);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            localStorage.setItem('favorites', JSON.stringify([...favorites, imdbID]));
        }

        setIsFavorite(!isFavorite);
    };

    if (!movie) return null;

    return (
        <div className="movie-details-container">
            <div className="details">
                <button onClick={goBack}>Back</button>
                <h2>{movie.Title}</h2>
                <p>{movie.Plot}</p>
                <p>Director: {movie.Director}</p>
                <p>Actors: {movie.Actors}</p>
                <p>Rating: {movie.imdbRating}</p>
                <p>Duration: {movie.Runtime}</p>
                <button onClick={toggleFavorite}>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
            <div className="poster">
                {movie.Poster !== 'N/A' && (
                    <img src={movie.Poster} alt={movie.Title} />
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
