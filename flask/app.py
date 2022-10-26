from flask import Flask
import kobert

application = Flask(__name__)


@application.route("/")
def hello():
    return "Hello kobert!"

@application.route('/tags/<text>')
def select(text):
    print(kobert.getTags(text))
    return 'hi %s' % name

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=5000)
