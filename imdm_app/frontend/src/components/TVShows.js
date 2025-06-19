import React, { useEffect, useState } from "react";
import axios from "axios";

function TVShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=485cf1e763eb302fb132b340be60cf79")
      .then((res) => setShows(res.data.results))
      .catch((err) => console.error("Failed to fetch shows", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Trending TV Shows This Week</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {shows.map((show) => (
          <div key={show.id} style={{ margin: "10px", width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={show.name}
              style={{ width: "100%" }}
            />
            <h4>{show.name}</h4>
            <p>Rating: {show.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TVShows;
