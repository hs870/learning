from flask import Flask, render_template, request, flash, redirect, url_for
from markupsafe import Markup
from flask_wtf import FlaskForm, CSRFProtect
from wtforms.validators import DataRequired, Length, Regexp
from wtforms.fields import *
from flask_bootstrap import Bootstrap5, SwitchField

app = Flask(__name__)
bootstrap = Bootstrap5(app)
app.secret_key = 'dev'

@app.route('/')
def index():
    return render_template('video.html')

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

def main():
    app.run(port=5005, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()