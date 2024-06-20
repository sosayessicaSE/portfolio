from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager
from flask_marshmallow import Marshmallow
import secrets
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

# Initialize extensions
login_manager = LoginManager()
ma = Marshmallow()
db = SQLAlchemy()

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

# Model for User (used in log-in and sign-in).
class User(db.Model, UserMixin):
    # Columns required to create a user
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    g_auth_verify = db.Column(db.Boolean, default=False)
    token = db.Column(db.String, default='', unique=True)
    # Relationship with books
    books = db.relationship('Book', backref='owner', lazy=True)

    def __init__(self, email, password='', g_auth_verify=False):
        self.id = self.set_id()
        self.password = self.set_password(password)
        self.email = email
        self.token = self.set_token(24)
        self.g_auth_verify = g_auth_verify

    # Token setter
    def set_token(self, length):
        return secrets.token_hex(length)

    # ID setter
    def set_id(self):
        return str(uuid.uuid4())
    
    # Password setter
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        return self.password_hash

    # Confirmation message
    def __repr__(self):
        return f'User {self.email} has been added to the database'

# Model for a book (used to store favourite books in a digital library)
class Book(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    authors_first_name = db.Column(db.String(150))
    authors_last_name = db.Column(db.String(200))
    book_title = db.Column(db.String(200))
    genre = db.Column(db.String(200))
    pages = db.Column(db.String(200))
    user_id = db.Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)
     
    def __init__(self, authors_first_name, authors_last_name, book_title, genre, pages, user_id, id=''):
        self.id = id if id else uuid.uuid4()
        self.authors_first_name = authors_first_name
        self.authors_last_name = authors_last_name
        self.book_title = book_title
        self.genre = genre
        self.pages = pages
        self.user_id = user_id
        
    def __repr__(self):
        return f'The following book has been added to the library: {self.book_title}'

    def to_dict(self):
        return {
            'id': str(self.id),  # Convert UUID to string for JSON serialization
            'authors_first_name': self.authors_first_name,
            'authors_last_name': self.authors_last_name,
            'book_title': self.book_title,
            'genre': self.genre,
            'pages': self.pages,
            'user': str(self.user_id)  # Convert UUID to string for JSON serialization
        }

class UserSchema(ma.Schema):
    class Meta:
        fields = ['id', 'email', 'g_auth_verify']

class BookSchema(ma.Schema):
    owner = ma.Nested(UserSchema, attribute='owner')

    class Meta:
        fields = ['id', 'authors_first_name', 'authors_last_name', 'book_title', 'genre', 'pages', 'owner']

book_schema = BookSchema()
books_schema = BookSchema(many=True)
