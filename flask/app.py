from flask import Flask, request, jsonify, json
import kobert

application = Flask(__name__)

@application.route("/kobert/")
def hello():
    return "Hello kobert!"

@application.route('/kobert/tags', methods=['POST'])
def getTags():
    text = request.json['text']
    print(text)
    if not text: return jsonify(tags=[])

    try: 
        tags = kobert.getTags(text)
        return jsonify(tags=tags)
    except Exception as e:
        print(e)
        return jsonify(tags=[])

if __name__ == "__main__":
   application.run(host='0.0.0.0', port=5000, debug=True)