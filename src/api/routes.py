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
    formatted_shifts = []
    for shift in shifts:
        formatted_shifts.append({
            'id': shift.id,
            'startTime': shift.start_time.isoformat(),
            'endTime': shift.end_time.isoformat(),
            'teamLead': shift.team_lead,
            'manager': shift.manager,
        })
    return jsonify(formatted_shifts), 200

@api.route('/preferences', methods=['POST'])
@jwt_required()
def create_preference():
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify(error='Not logged in'), 403
    data = request.get_json()
    preference = Preference(user_id=user_id, shift_id=data['shiftId'], rank=data['rank'])
    db.session.add(preference)
    db.session.commit()
    return jsonify(success=True), 200

@api.route('/preferences/<int:preference_id>', methods=['PUT'])
@jwt_required()
def update_preference(preference_id):
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify(error='Not logged in'), 403
    data = request.get_json()
    preference = Preference.query.filter_by(id=preference_id, user_id=user_id).first()
    if preference:
        preference.rank = data['rank']
        db.session.commit()
        return jsonify(success=True), 200
    else:
        return jsonify(error='Preference not found'), 404

@api.route('/preferences/<int:preference_id>', methods=['DELETE'])
@jwt_required()
def delete_preference(preference_id):
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify(error='Not logged in'), 403
    preference = Preference.query.filter_by(id=preference_id, user_id=user_id).first()
    if preference:
        db.session.delete(preference)
        db.session.commit()
        return jsonify(success=True), 200
    else:
        return jsonify(error='Preference not found'), 404