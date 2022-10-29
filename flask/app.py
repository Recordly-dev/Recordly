application = Flask(__name__)


@application.route("/kobert/")
def hello():
    return "Hello kobert!"

@application.route('/kobert/tags/<text>')
def select(text):
    print(kobert.getTags(text))
    return 'hi %s' % kobert.getTags(text)

#if __name__ == "__main__":
#    application.run(host='0.0.0.0', port=5000)