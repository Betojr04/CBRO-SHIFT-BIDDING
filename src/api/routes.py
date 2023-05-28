"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_mail import Mail, Message

api = Flask(__name__)
mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": 'your-email@gmail.com',
    "MAIL_PASSWORD": 'your-password'
}

api.config.update(mail_settings)
mail = Mail(api)

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/send-mail', methods=['POST'])
def send_mail():
    data = request.get_json()
    msg = Message(subject="Help Request",
                  sender=app.config.get("MAIL_USERNAME"),
                  recipients=["scheduling-department@example.com"], # replace with your email
                  body="From: {0}\n{1}".format(data['email'], data['message']))
    mail.send(msg)
    return 'Mail sent'