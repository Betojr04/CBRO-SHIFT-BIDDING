"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message

api = Flask(__name__)
mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": 'hello@betovaltierra.com',
    "MAIL_PASSWORD": 'Beto839914!!'
}

api.config.update(mail_settings)
mail = Mail(api)

# api = Flask(__name__)
# api.config['SQLALCHEMY_DATABASE_URL'] = 'https://3001-betojr04-cbroshiftbiddi-lr5r9os8qpc.ws-us98.gitpod.io'  # replace with your actual database URI
# db.init_app(api)

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# route for sending an email to the scheduling department
@api.route('/send-mail', methods=['POST'])
def send_mail():
    data = request.get_json()
    msg = Message(subject="Help Request",
                  sender=api.config.get("MAIL_USERNAME"),
                  recipients=["scheduling-department@example.com"], # replace with your email
                  body="From: {0}\n{1}".format(data['email'], data['message']))
    mail.send(msg)
    return 'Mail sent'

# creating a new user
@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify(error='Email and password are required'), 400

    if User.query.filter_by(email=email).first():
        return jsonify(error='Email already exists'), 409

    hashed_password = generate_password_hash(password)

    user = User(email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify(message='User created successfully'), 201


# loggin in said user
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify(error='Email and password are required'), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify(error='Invalid email or password'), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200



@api.route('/shifts', methods=['GET'])
@jwt_required()
def get_shifts():
    shifts = Shift.query.all()
    return jsonify([shift.to_dict() for shift in shifts]), 200



@api.route('/shifts/<int:shift_id>/bids', methods=['POST'])
@jwt_required()
def submit_bid(shift_id):
    bid_value = request.json.get('bid')
    user_id = get_jwt_identity()
    
    if not user_id:
        return jsonify(error='Not logged in'), 403

    bid = Bid(user_id=user_id, shift_id=shift_id, bid=bid_value)
    db.session.add(bid)
    db.session.commit()
    
    return jsonify(success=True), 200