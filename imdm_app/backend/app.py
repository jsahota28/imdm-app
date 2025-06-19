from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, FavoriteMovie, Review
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    user = User(username=data["username"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"id": user.id, "username": user.username}), 201

@app.route("/favorites", methods=["POST"])
def add_favorite():
    data = request.get_json()
    fav = FavoriteMovie(title=data["title"], user_id=data["user_id"])
    db.session.add(fav)
    db.session.commit()
    return jsonify({"id": fav.id, "title": fav.title}), 201

@app.route("/favorites/<int:user_id>", methods=["GET"])
def get_favorites(user_id):
    favs = FavoriteMovie.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": f.id, "title": f.title} for f in favs]), 200

@app.route("/favorites/<int:id>", methods=["DELETE"])
def delete_favorite(id):
    fav = FavoriteMovie.query.get(id)
    if fav:
        db.session.delete(fav)
        db.session.commit()
        return jsonify({"message": "Deleted"}), 200
    return jsonify({"error": "Not found"}), 404

@app.route("/reviews", methods=["POST"])
def create_review():
    data = request.get_json()
    review = Review(
        movie_title=data["movie_title"],
        content=data["content"],
        user_id=data["user_id"]
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

@app.route("/reviews", methods=["GET"])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([r.to_dict() for r in reviews]), 200

@app.route("/reviews/<int:id>", methods=["PUT"])
def update_review(id):
    data = request.get_json()
    review = Review.query.get(id)
    if review:
        review.content = data["content"]
        db.session.commit()
        return jsonify(review.to_dict()), 200
    return jsonify({"error": "Not found"}), 404

@app.route("/reviews/<int:id>", methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Deleted"}), 200
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port= 5000)
