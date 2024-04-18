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
        received = request.get_data(as_text=True)
        print("received ficou com o conteudo em formato json")
        type2 = type(received)
        print("new type of variable:")
        print(type2)
        print("type2 foi imprimido acima")
        print(received)
        print("received foi imprimdo acima")
        j = len(received)
        print("A string recebida tem "+str(j)+" chars")
        i = 0
        params = 0
        print("houve um cast mas j deve manter-se como INT")
        print(type(j))
        print("imprimiu.se o type de j")
        while(i < j):
            #print(i)
            if (received[i] == '='):
                print("encontrou.se um = no indice: "+str(i)+" ... proseguindo")
                params += 1
            if (received[i] == '&'):
                print("encontrou.se um & no indice: "+str(i)+" ... proseguindo")
            i += 1
        #par1 = 
        #par2 = 
        print("acabou de correr a string, "+str(params)+" parametros encontrados")
        return render_template('post.html')


def main():
    app.run(port=5005, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()