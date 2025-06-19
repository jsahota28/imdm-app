import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#222", color: "white" }}>
      <Link to="/" style={{ margin: "10px", color: "white" }}>Home</Link>
      <Link to="/movies" style={{ margin: "10px", color: "white" }}>Movies</Link>
      <Link to="/tvshows" style={{ margin: "10px", color: "white" }}>TV Shows</Link>
      <Link to="/nearby" style={{ margin: "10px", color: "white" }}>Nearby Theaters</Link>
    </nav>
  );
}

export default Navbar;
