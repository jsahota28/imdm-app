import React from "react";
import { Link } from "react-router-dom";
import FavoriteList from "../components/FavoriteList";
import ReviewList from "../components/ReviewList";

function Home() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <h1 style={styles.logo}>IMDM</h1>
      <p style={styles.subtitle}>
        Welcome to IMDM — your one-stop destination to search movies, explore trending TV shows, and see what’s playing near you.
      </p>

      {/* Navigation Buttons */}
      <div style={styles.buttonGroup}>
        <Link to="/movies"><button style={styles.button}>Search Movies</button></Link>
        <Link to="/tvshows"><button style={styles.button}>TV Shows</button></Link>
        <Link to="/nearby"><button style={styles.button}>Nearby Theaters</button></Link>
      </div>

      {/* Favorites */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⭐ My Favorite Movies</h2>
        <FavoriteList userId={1} />
      </div>

      {/* Reviews */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💬 Recent Reviews</h2>
        <ReviewList />
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} IMDM Movie Explorer | Built with ❤️ using React & Flask
      </footer>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#121212",
    color: "#f0f0f0",
    minHeight: "100vh",
    padding: "30px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logo: {
    color: "yellow",
    fontSize: "4rem",
    textAlign: "center",
    marginBottom: "10px",
    letterSpacing: "5px",
  },
  subtitle: {
    textAlign: "center",
    maxWidth: "700px",
    margin: "0 auto 30px",
    fontSize: "1.2rem",
    color: "#ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "40px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "yellow",
    color: "#121212",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  section: {
    marginBottom: "50px",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    borderRadius: "10px",
  },
  sectionTitle: {
    color: "#ffcc00",
    marginBottom: "10px",
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
    color: "#888",
    fontSize: "0.9rem",
  },
};

export default Home;
