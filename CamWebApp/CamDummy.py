import requests
import json

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

zoom = "50"
focus = "77"
piris = "30"

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/lens/homing')
def reply():
    return jsonify(status = "pass")

@app.route('/lens/focus', methods=['GET', 'POST'])
def lens_Focus():
    if request.method == 'GET':
        return jsonify(status = "pass", value = focus)
    elif request.method == 'POST':
        print("Dummy got a post")
        info = request.json
        print (info)
        print("dummy will attempt to return")
        return jsonify(status = "pass")


@app.route('/lens/piris', methods=['GET', 'POST'])
def lens_Piris():
    if request.method == 'GET':
        return jsonify(status = "pass", value = piris)

@app.route('/lens/zoom', methods=['GET', 'POST'])
def lens_Zoom():
    if request.method == 'GET':
        return jsonify(status = "pass", value = zoom)

def main():
    app.run(port=5000, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()