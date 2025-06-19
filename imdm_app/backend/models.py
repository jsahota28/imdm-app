from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    reviews = db.relationship('Review', backref='user', cascade="all, delete")
    favorites = db.relationship('FavoriteMovie', backref='user', cascade="all, delete")

class FavoriteMovie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    movie_title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.String(300), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "movie_title": self.movie_title,
            "content": self.content,
            "user_id": self.user_id
        }
