import React, { useEffect, useState } from "react";
import axios from "axios";

function NearbyTheaters() {
  const [zip, setZip] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const tmdbKey = "485cf1e763eb302fb132b340be60cf79"; 

  const fetchMovies = (region = "US") => {
    axios
      .get("https://api.themoviedb.org/3/movie/now_playing", {
        params: {
          api_key: tmdbKey,
          language: "en-US",
          region: region,
          page: 1,
        },
      })
      .then((res) => setMovies(res.data.results))
      .catch((err) => {
        console.error("TMDB error:", err);
        setError("Could not fetch movies.");
      });
  };

  useEffect(() => {
    // Default to geolocation if ZIP not used
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Using geolocation:", position.coords);
        fetchMovies(); // US as default
      },
      (err) => {
        console.error("Geo error:", err);
        setError("Location access denied.");
        fetchMovies(); // Still try default
      }
    );
  }, []);

  const handleZipSubmit = (e) => {
    e.preventDefault();

    // For now, assume all ZIPs map to US (you can integrate a ZIP API for city/region)
    if (zip.length === 5 && /^[0-9]+$/.test(zip)) {
      fetchMovies("US");
      setError("");
    } else {
      setError("Please enter a valid 5-digit US ZIP code.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Now Playing Movies Near You</h2>

      {/* Zip Form */}
      <form onSubmit={handleZipSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter ZIP code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          style={{ padding: "8px", fontSize: "1rem", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Find Movies
        </button>
      </form>

      {/* Error or Movie List */}
      {error && <p>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: "10px", width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h4>{movie.title}</h4>
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyTheaters;
