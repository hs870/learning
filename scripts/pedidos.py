import requests

envio = requests.get(
    "http://localhost:5000/teste",
    )

print(envio.content)


envio = requests.post(
    "http://localhost:5000/teste2",
    json={"param1": "sucesso"}
    )

print(envio.content)
