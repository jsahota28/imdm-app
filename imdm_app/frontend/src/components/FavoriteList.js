import React, { useEffect, useState } from "react";
import axios from "axios";

function FavoriteList({ userId }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/favorites/${userId}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Error loading favorites", err));
  }, [userId]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>My Favorite Movies</h3>
      <ul>
        {favorites.map((f) => (
          <li key={f.id}>{f.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
