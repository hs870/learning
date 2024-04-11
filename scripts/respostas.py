import requests
import json

from flask import Flask, request




app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/teste', methods=["GET"])
def test_page():
    return 'Uma pagina de testes'

@app.route('/page2')
def find_info():
     r=requests.get().content
     return r

@app.route('/teste2', methods=["POST"])
def trying_post():
    received = request.json
    print(received)
    type1 = type(received)
    print("type of variable:")
    print(type1)
    print(received["param1"])
    return (received)


def main():
    app.run(port=5000, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    print("linha a imprimir"+__name__)
    main()