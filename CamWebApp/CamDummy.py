import requests
import json

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/lens/homing')
def reply():
    return jsonify(status = "pass")

@app.route('/lens/focus', methods=['GET', 'POST'])
def lens_Focus():
    if request.method == 'GET':
        return jsonify(status = "pass", value = "99")

@app.route('/lens/aperture', methods=['GET', 'POST'])
def lens_Aperture():
    if request.method == 'GET':
        return jsonify(status = "pass", value = "55")

@app.route('/lens/zoom', methods=['GET', 'POST'])
def lens_Zoom():
    if request.method == 'GET':
        return jsonify(status = "pass", value = "42")

def main():
    app.run(port=5000, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()