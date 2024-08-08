from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from models import User, db, check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/user', methods=['GET'])
@login_required
def get_user():
    if current_user.is_authenticated:
        user_data = {
            'id': current_user.id,
            'email': current_user.email,
        }
        return jsonify(user_data), 200
    else:
        return jsonify({'error': 'User not authenticated'}), 401

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        user = User(email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()  
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    logged_user = User.query.filter_by(email=email).first()
    if logged_user and check_password_hash(logged_user.password, password):
        login_user(logged_user)
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200
