from functools import wraps
import secrets
from flask import request, jsonify, json, Flask
import decimal
from models import User
from functools import wraps
from flask import request, jsonify
from models import User

def token_required(this_function):
    @wraps(this_function)
    def decorated(*args, **kwargs):
        token = None

        # Debug print to check all request headers
        print('Request headers:', request.headers)

        # Check if the token is present in the request headers
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        
        # Debug print statement to check the received token
        print(f'Received token: {token}')

        # If no token is provided, return an error message
        if not token:
            return jsonify({'message': 'Token is missing.'}), 401

        try:
            # Query the User model to find the user associated with the token
            current_user_token = User.query.filter_by(token=token).first()
            
            if not current_user_token:
                return jsonify({'message': 'Token is invalid'}), 401
        except Exception as e:
            print(e)  # Log the error for debugging purposes
            return jsonify({'message': 'An error occurred while verifying the token'}), 500
        
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

app = Flask(__name__)
app.json_encoder = JSONEncoder
