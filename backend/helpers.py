from functools import wraps
import secrets
from flask import request, jsonify, json
import decimal
from models import User

# Decorator to ensure that a valid token is provided in the request headers
def token_required(this_function):
    @wraps(this_function)
    def decorated(*args, **kwargs):
        token = None

        # Check if the token is present in the request headers
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token'].split(' ')[1]
        
        # If no token is provided, return an error message
        if not token:
            return jsonify({'message': 'Token is missing.'}), 401

        try:
            # Query the User model to find the user associated with the token
            current_user_token = User.query.filter_by(token=token).first()
            print(token)
            print(current_user_token)
        except:
            # If an error occurs, ensure that the token is valid and belongs to a user
            owner = User.query.filter_by(token=token).first()

            # Compare tokens securely to avoid timing attacks
            if token != owner.token and secrets.compare_digest(token, owner.token):
                return jsonify({'message': 'Token is invalid'})
        
        # Proceed with the decorated function if the token is valid
        return this_function(current_user_token, *args, **kwargs)
    
    return decorated

# Custom JSON Encoder to handle additional data types
class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        # Convert decimal.Decimal objects to strings
        if isinstance(obj, decimal.Decimal):
            return str(obj)
        # Use the default method for other data types
        return super(JSONEncoder, self).default(obj)
