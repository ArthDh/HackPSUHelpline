from flask import render_template, jsonify, redirect, request
from flask_login import current_user
from app import app
from app import models, db
import json
import random

from twitter.Tweet import Tweet


class User:
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Map')


@app.route('/nav')
def nav():
    return render_template('nav.html', title='Navigation')


@app.route('/map/refresh', methods=['POST'])
def map_refresh():
    points = [(random.uniform(48.8434100, 48.8634100),
               random.uniform(2.3388000, 2.3588000))
              for _ in range(random.randint(2, 9))]
    return jsonify({'points': points})


@app.route('/contact')
def contact():
    return render_template('contact.html', title='Contact')


@app.route('/api/getUnmatchedRequest', methods=['GET'])
def get_unmatched_request():
    requests = models.Requesters.query.all()
    requester_list = list()
    for req in requests:
        requester_list.append({
            'username': req.username,
            'lat': req.lat, 'lng': req.lng,
            'message': req.message,
            'radius': req.radius,
            'matched': req.matched,
            'person_type': req.__tablename__
        })
    return json.dumps(requester_list)


@app.route('/api/respond')
def api_respond():
    if not current_user.is_authenticated:
        redirect('/signin', code=302)
    else:
        request_param: dict = dict(request.args)
        try:
            requester = request_param['requester']
            email = current_user.get_id()
            user = models.Responder.query.filter_by(email=email).first()
            Tweet().tweet(user.first_name, requester)
        except:
            pass
        finally:
            return jsonify({})