import requests

envio = requests.post(
    "http://localhost:5005/teste2",
    json={"param1": "sucesso"}
    )

print("linha final AAAA")
print(envio.content)