from flask import Flask, render_template, request, flash, redirect, url_for
from markupsafe import Markup
from flask_wtf import FlaskForm, CSRFProtect
from wtforms.validators import DataRequired, Length, Regexp
from wtforms.fields import *
from flask_bootstrap import Bootstrap5, SwitchField

app = Flask(__name__)
bootstrap = Bootstrap5(app)
app.secret_key = 'dev'

value0 = 4
value1 = 3
value2 = 2
value3 = 5
value4 = 8
value5 = 7
value6 = 10

class MyFirstForm(FlaskForm):

    slider0 = IntegerRangeField(render_kw={'min': '0', 'max': '10', 'value': value0})
    slider1 = IntegerRangeField(render_kw={'min': '0', 'max': '10', 'value': value1})
    slider2 = IntegerRangeField(render_kw={'min': '0', 'max': '10', 'value': value2})
    slider3 = IntegerRangeField(render_kw={'min': '0', 'max': '10', 'value': value3})
    slider4 = IntegerRangeField(render_kw={'min': '0', 'max': '10', 'value': value4})
    slider5 = IntegerRangeField(render_kw={'min': '0', 'max': '10', 'value': value5})
    slider6 = IntegerRangeField(render_kw={'min': '0', 'max': '10', 'value': value6})
    submit = SubmitField()


    def update_sliders(self, info):
        print("entrou dentro de sliders")
        print(info)
        #if (info["slider0"] != value0):
        # value0 = info["slider0"]
            #self.slider0 = IntegerRangeField(render_kw={'min': '0', 'max': '10', 'value': value0})
        value1 = info["slider1"]
        value2 = info["slider2"]
        value3 = info["slider3"]
        value4 = info["slider4"]
        value5 = info["slider5"]
        value6 = info["slider6"]
        print("vai acabar a funcao")

@app.route('/PostRoute', methods=['POST'])
def PostRoute():
    form = MyFirstForm()
    print("entrou na nova rota")
    info = form.data
    print(info)
    form.update_sliders(info)
    return render_template('index.html', form=form)


@app.route('/', methods=['GET', 'POST'])
def index():
    form = MyFirstForm()
    if request.method == 'GET':
        print("method was GET")
    elif request.method == 'POST':
        print("method was POST")
        print(form.data)
        info = form.data
        print(info)
        print("update sliders to be called with info next")
        form.update_sliders(info)
    return render_template('index.html', form=form)    
        

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