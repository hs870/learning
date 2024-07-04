from flask import Flask, render_template, request, flash, redirect, url_for
import requests
import os

app = Flask(__name__)
app.secret_key = 'dev'
ip = "http://192.168.0.30:5000"
#ip = "http://127.0.0.1:5005"

clear_feed_files = 'rm ./static/feed/*'
run_ffmpeg = 'ffmpeg -fflags nobuffer -i rtsp://192.168.0.30/stream1 -c:v copy -c:a copy -hls_time 1 -hls_list_size 5 -hls_flags delete_segments -start_number 1 ./static/feed/stream.m3u8 &'
teste = 'rm static/feed/*'

def cam_get(target):
    envio = requests.get(
        ip + target,
    )
    return (envio.json())

def cam_post(payload, target):
    envio = requests.post(
        ip + target,
        json = payload
    )
    return (envio.content)
#para chamar esta função : cam_post(request.json, /lens/swir))

@app.route('/from_js', methods=['POST'])
def from_js():
    info = request.json
    method = info.pop("method")
    target = info.pop("target")
    
    if (method == "post"):
        result = cam_post(info, target)
        print(result)
    elif(method == 'get'):
        result = cam_get(target)
    return (result)

@app.route('/', methods=['GET'])
def index():
    # os.system(clear_feed_files)
    # os.system(run_ffmpeg)
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



def main():
    app.run(port=5007, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()