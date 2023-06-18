from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
import datetime


db = SQLAlchemy()

class Shift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    team_lead = db.Column(db.String(64))
    manager = db.Column(db.String(64))
    bids = db.relationship('Bid', backref='shift', lazy='dynamic',primaryjoin='Shift.id == Bid.shift_id')

class Bid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    shift_id = db.Column(db.Integer, db.ForeignKey('shift.id'), nullable=False)
    bid = db.Column(db.Integer, nullable=False)


class Preference(db.Model):


    id = db.Column(db.Integer, primary_key=True)
    shift_id = db.Column(db.Integer, db.ForeignKey('shift.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) # it should be 'users.id' not 'user.id'


class User(db.Model):


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    hire_date = db.Column(db.DateTime)
    assigned_shift_id = db.Column(db.Integer, db.ForeignKey('shifts.id'))

    # establish a relationship with Preference
    preferences = db.relationship('Preference', backref=db.backref('users', lazy='joined'), lazy='dynamic')
    bids = db.relationship('Bid', backref='users', lazy='dynamic')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_jwt(self):
        access_token = create_access_token(identity=self.id)
        return access_token
