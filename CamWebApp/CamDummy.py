import requests
import json

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/lens/homing')
def reply():
    return jsonify(status = "pass")


def main():
    app.run(port=5000, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()