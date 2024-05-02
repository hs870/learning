from flask import Flask, render_template, request, flash, redirect, url_for
from markupsafe import Markup
from flask_wtf import FlaskForm, CSRFProtect
from wtforms.validators import DataRequired, Length, Regexp
from wtforms.fields import *
from flask_bootstrap import Bootstrap5, SwitchField


app = Flask(__name__)
bootstrap = Bootstrap5(app)
app.secret_key = 'dev'

class MyFirstForm(FlaskForm):
    value1 = IntegerField()
    value2 = IntegerField()
    text1 = StringField()
    slider1 = IntegerRangeField(render_kw={'min': '0', 'max': '10'})
    submit = SubmitField()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/form', methods=['GET', 'POST'])
def form():
    form = MyFirstForm()
    if request.method == 'GET':
        print("GOT the form")
        return render_template('form.html', form=form)
    elif request.method == 'POST':
        info = form.data
        type1 = type(info)
        print("info tem o tipo:")
        print(type1)
        print(info["value1"])
        print(info["value2"])
        print(info["text1"])
        print(info["slider1"])
        field1 = info["value1"]
        field2 = form.data["value2"]
        return render_template('result.html', param1 = field1, param2 = field2, param3 = form.data["text1"], param4 = info["slider1"])


def main():
    app.run(port=5005, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()