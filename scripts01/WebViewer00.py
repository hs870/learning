from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')


def main():
    app.run(port=5001, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()