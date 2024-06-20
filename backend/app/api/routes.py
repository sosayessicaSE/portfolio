from flask import Blueprint, request, jsonify
from helpers import token_required
from models import db, User, Book, book_schema, books_schema

api = Blueprint('api', __name__)


# Retrieving single
@api.route('/library/<id>', methods=['GET'])
@token_required
def get_single_book(current_user_token, id):
    book = Book.query.get(id)
    return jsonify(book_schema.dump(book))

# Creating
# Creating
# Creating
@api.route('/library/add', methods=['POST'])
@token_required
def add_book_to_library(current_user_token):
    data = request.get_json()
    
    book_title = data.get('book_title')
    authors_first_name = data.get('authors_first_name')
    authors_last_name = data.get('authors_last_name')
    genre = data.get('genre')
    pages = data.get('pages')
    
    if not all([book_title, authors_first_name, authors_last_name, genre, pages]):
        return jsonify({'message': 'Missing required data.'}), 400

    # Check if the current_user_token is a User instance and is not None
    if isinstance(current_user_token, User) and current_user_token:
        # Create a new book instance and set its attributes
        book = Book(
            authors_first_name=authors_first_name,
            authors_last_name=authors_last_name,
            book_title=book_title,
            genre=genre,
            pages=pages,
            user_id=current_user_token.id  # Set the user_id for the book
        )
        
        try:
            # Add the new book to the database
            db.session.add(book)
            db.session.commit()
            return jsonify({'message': 'Book added successfully.'})
        except Exception as e:
            db.session.rollback()  # Rollback the session in case of an error
            error_message = f'Error adding book: {str(e)}'
            return jsonify({'message': error_message}), 500
    else:
        return jsonify({'message': 'Invalid user or user not found.'}), 404


# Retrieve user's books
@api.route('/library', methods=['GET'])
@token_required
def get_all_books(current_user_token):
    # Ensure you extract the token string from the current_user_token object
    user_token = current_user_token.token if current_user_token else None
    
    if user_token:
        # Use the extracted user token to filter books
        user = User.query.filter_by(token=user_token).first()
        if user:
            # Fetch books associated with the user
            books = Book.query.filter_by(user_id=user.id).all()
            books_list = [book.to_dict() for book in books]
            return jsonify({'books': books_list})
        else:
            return jsonify({'message': 'User not found.'}), 404
    else:
        return jsonify({'message': 'User token not provided.'}), 400


@api.route('/library/<id>', methods=['PUT'])
@token_required
def update_book(current_user_token, id):
    book = Book.query.get(id)

    if not book:
        return jsonify({'message': 'Book not found.'}), 404

    data = request.get_json()
    book.authors_first_name = data.get('authors_first_name', book.authors_first_name)
    book.authors_last_name = data.get('authors_last_name', book.authors_last_name)
    book.book_title = data.get('book_title', book.book_title)
    book.genre = data.get('genre', book.genre)
    book.pages = data.get('pages', book.pages)

    db.session.commit()

    return jsonify({'message': 'Book updated successfully.', 'data': book_schema.dump(book)})

# Deleting a book
@api.route('/library/<id>', methods=['DELETE'])
@token_required
def delete_book(current_user_token, id):
    book = Book.query.get(id)
    if not book:
        return jsonify({'message': 'Book not found.'}), 404

    db.session.delete(book)
    db.session.commit()

    return jsonify({'message': 'Book deleted successfully.'})