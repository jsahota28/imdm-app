import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieSearch from "./components/MovieSearch";
import TVShows from "./components/TVShows";
import NearbyTheaters from "./components/NearbyTheaters";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieSearch />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/nearby" element={<NearbyTheaters />} />
      </Routes>
    </Router>
  );
}

export default App;
