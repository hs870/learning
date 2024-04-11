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
        return render_template('post.html')


def main():
    app.run(port=5005, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()