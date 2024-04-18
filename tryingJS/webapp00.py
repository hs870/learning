import requests
from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/')
def hello():
        return render_template('home.html')


@app.route('/page1', methods=["POST"])
def form_submission():
     #aqui entram coisas desta pagina que deve ser mostrada quando for submetido o formulario
     return render_template('p1.html')

def main():
    app.run(port=5005, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()