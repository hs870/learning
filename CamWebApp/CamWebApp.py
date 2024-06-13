from flask import Flask, render_template, request, flash, redirect, url_for
from markupsafe import Markup
from flask_wtf import FlaskForm, CSRFProtect
from wtforms.validators import DataRequired, Length, Regexp
from wtforms.fields import *
from flask_bootstrap import Bootstrap5, SwitchField
import requests

app = Flask(__name__)
bootstrap = Bootstrap5(app)
app.secret_key = 'dev'
ip = "http://192.168.0.30:5000"


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        print("the method was GET")
    elif request.method == 'POST':
        print("POST was the method")
        print (request.data)
    return render_template('index.html')
        

@app.route('/instructions', methods=['GET'])
def instructions():
    return render_template('instructions.html')


@app.route('/report', methods=['GET'])
def report():
    return render_template('report.html')


@app.route('/presentation', methods=['GET'])
def presentation():
    return render_template('presentation.html')


@app.route('/info', methods=['GET'])
def info():
    return render_template('info.html')


@app.route('/notas', methods=['GET'])
def notas():
    return render_template('notas.html')

@app.route('/getfocus', methods=['GET'])
def getfocus():
    envio = requests.get(
        ip + "/lens/focus",
    )
    print(envio.content)
    return (envio.content)

@app.route('/getzoom', methods=['GET'])
def getzoom():
    envio = requests.get(
        ip + "/lens/zoom",
    )
    print(envio.content)
    return (envio.content)

@app.route('/getpiris', methods=['GET'])
def getpiris():
    envio = requests.get(
        ip + "/lens/piris",
    )
    print(envio.content)
    return (envio.content)

@app.route('/postswir', methods=['POST'])
def postswir():
    payload = request.json
    print(payload)
    envio = request.post(
        ip + "/lens/swir",
        json = payload
    )
    return (envio.content)


def main():
    app.run(port=5005, debug=True, host='0.0.0.0')


if __name__ == '__main__':
    main()