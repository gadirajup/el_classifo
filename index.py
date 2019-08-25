from flask import Flask

app = Flask(__name__)

@app.route('/')
def el_classifo():
    return 'El Classifo'