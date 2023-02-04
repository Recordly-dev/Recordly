from flask import Flask, request, jsonify, json
import kobert

application = Flask(__name__)

@application.route("/kobert/")
def hello():
    return "Hello kobert!"

@application.route('/kobert/tags', methods=['POST'])
def getTags():
    try:
        text = request.json['text']
        if not text: raise Exception("text가 비어있습니다.")

        tags = kobert.getTags(text)

    except Exception as e:
        print(e)
        data = { 
            'description': '추천 태그 추출이 불가합니다.',
            'result': {
                'tags': []
            }
        }
        return jsonify(data), 200

    data = { 
        'description': '추천 태그가 정상적으로 조회되었습니다.',
        'result': {
            'tags': tags
        }
    }
    return jsonify(data), 200

if __name__ == "__main__":
   application.run(host='0.0.0.0', port=5000, debug=True)