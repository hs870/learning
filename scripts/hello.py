"""test Flask with this"""

from flask import Flask



app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/teste', methods=["GET"])
def test_page():
        return 'Uma pagina de testes'

def main():
    app.run(port=5000, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    print("linha a imprimir"+__name__)
    main()