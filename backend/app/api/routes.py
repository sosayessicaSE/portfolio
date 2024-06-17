from flask import Blueprint, request, jsonify, render_template
from helpers import token_required
from models import db, User, Book, book_schema, books_schema

api = Blueprint('api', __name__)


# Library form
@api.route('/library-form')
def library_form():
    return render_template('libraryform.html')

# Creating
@api.route('/library', methods=['POST'])
@token_required
def create_book(current_user_token):
    # Retrieve form data
    authors_first_name = request.form['authors_first_name']
    authors_last_name = request.form['authors_last_name']
    book_title = request.form['book_title']
    genre = request.form['genre']
    pages = request.form['pages']

    # Get the current user object
    current_user = User.query.filter_by(token=current_user_token).first()
    if not current_user:
        return jsonify({'message': 'User not found.'}), 404

    # Create a new book instance associated with the current user
    book = Book(
        authors_first_name=authors_first_name,
        authors_last_name=authors_last_name,
        book_title=book_title,
        genre=genre,
        pages=pages,
        user_token=current_user_token,
        user=current_user
    )

    # Add the new book to the database session and commit it
    db.session.add(book)
    db.session.commit()

    # Serialize the book object using the schema
    response = book_schema.dump(book)
    return jsonify(response)

# Retrieve user's books
@api.route('/library', methods=['GET'])
@token_required
def get_all_books(current_user_token):
    a_user = current_user_token
    books = Book.query.filter_by(user_token=a_user).all()
    return render_template('library.html', books=books)

# Retrieving single
@api.route('/library/<id>', methods=['GET'])
@token_required
def get_single_book(current_user_token, id):
    book = Book.query.get(id)
    return render_template('library.html', book=book, single_book=True)

@api.route('/library/<id>', methods=['POST', 'PUT'])
@token_required
def update_book(current_user_token, id):
    book = Book.query.get(id)

    if not book:
        return jsonify({'message': 'Book not found.'}), 404

    # Update the book attributes based on the form data
    book.authors_first_name = request.form.get('authors_first_name', book.authors_first_name)
    book.authors_last_name = request.form.get('authors_last_name', book.authors_last_name)
    book.book_title = request.form.get('book_title', book.book_title)
    book.genre = request.form.get('genre', book.genre)
    book.pages = request.form.get('pages', book.pages)
    book.user_token = current_user_token.token

    db.session.commit()

    response = book_schema.dump(book)
    return jsonify(response)

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
