import React, { useState } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");

  const omdbKey = "95ed4707";   
  const tmdbKey = "485cf1e763eb302fb132b340be60cf79";     

  const fetchTrailer = async (movieName) => {
    try {
      const searchRes = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${movieName}`
      );

      const movieId = searchRes.data.results[0]?.id;
      if (!movieId) return;

      const videoRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbKey}`
      );

      const trailer = videoRes.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setTrailerUrl("");
      }
    } catch (err) {
      console.error("Failed to fetch trailer", err);
      setTrailerUrl("");
    }
  };

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${query}&apikey=${omdbKey}`
      );
      if (response.data.Response === "True") {
        setMovie(response.data);
        setError("");
        fetchTrailer(query);
      } else {
        setError("Movie not found.");
        setMovie(null);
        setTrailerUrl("");
      }
    } catch {
      setError("Error fetching data.");
    }
  };

  const saveFavorite = async () => {
    try {
      await axios.post("http://localhost:5000/favorites", {
        title: movie.Title,
        user_id: 1,
      });
      alert("Added to favorites!");
    } catch {
      alert("Failed to save favorite.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search a Movie</h2>
      <input
        type="text"
        value={query}
        placeholder="Enter movie title"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchMovie}>Search</button>

      {error && <p>{error}</p>}
      {movie && (
        <div style={{ marginTop: "20px" }}>
          <h3>{movie.Title}</h3>
          <p>{movie.Plot}</p>
          <img src={movie.Poster} alt={movie.Title} />
          <br />
          <button onClick={saveFavorite}>Save to Favorites</button>
          <ReviewForm userId={1} />

          {trailerUrl && (
            <div style={{ marginTop: "20px" }}>
              <h4>Trailer</h4>
              <iframe
                width="560"
                height="315"
                src={trailerUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Trailer"
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
