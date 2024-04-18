import requests
from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html', val1=666, val2="333")

@app.route('/Go', methods=["GET", "POST"])
def test_page():
    if request.method == 'GET':
        print("Get was submitted")
        return render_template('get.html')
    elif request.method == 'POST':
        print("Post was submitted")
        print("type of variable:")
        type1 = type(request)
        print(type1)
        print("type1 foi imprimido acima")
        print(request)
        print("request foi imprimido acima")
        received = request.get_json()
        print("received ficou com o conteudo em formato json")
        type2 = type(received)
        print("new type of variable:")
        print(type2)
        print("type2 foi imprimido acima")
        print(received)
        print("received foi imprimdo acima")
        #print(received["param1"])
        return render_template('post.html')


def main():
    app.run(port=5005, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()