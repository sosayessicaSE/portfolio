import os
from dotenv import load_dotenv

basedir= os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir,'.env'))

class Config():
    FLASK_APP= os.getenv('FLASK_APP')
    FLASK_DEBUG= os.environ.get('FLASK_DEBUG')
    FLASK_ENV= os.getenv('FLASK_ENV')
    SECRET_KEY=os.environ.get('SECRET_KEY') or 'Hi, this is my portfolio'
    SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URI')
    SQLALCHEMY_TRACK_NOTIFICATIONS=False