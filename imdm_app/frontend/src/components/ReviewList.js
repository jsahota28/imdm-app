import React, { useEffect, useState } from "react";
import axios from "axios";

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error loading reviews", err));
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>All Reviews</h3>
      {reviews.map((r) => (
        <div key={r.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
          <strong>{r.movie_title}</strong>: {r.content}
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
