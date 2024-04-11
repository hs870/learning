import re

def a_function():
    print("function was called")

print ("Hello World!")

x=4
print(x)

x="some random string"
print(x)

person=input("Tell me your name ")
x=input("ok, "+person+", how old are you? " )

person = "name: "+person+" age: "+x
print("person string is now:")
print(person)

words = re.split('name: | age', person)
print("words: ")
print(words)

print("recovered name from person string: ")#from full string (with known structure) recover name
name = words[1]
print(name)

a_function()

data={}
data["person"] =input(".")
data["surname"]=input("ok, "+person+", how old are you? " )
print(data)