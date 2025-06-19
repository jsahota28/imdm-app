import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ userId }) {
  const [movieTitle, setMovieTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/reviews", {
        movie_title: movieTitle,
        content,
        user_id: userId,
      });
      setMessage("Review submitted!");
      setMovieTitle("");
      setContent("");
    } catch {
      setMessage("Failed to submit review.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Write a Review</h3>
      <input
        type="text"
        placeholder="Movie title"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Your review"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit Review</button>
      <p>{message}</p>
    </div>
  );
}

export default ReviewForm;
