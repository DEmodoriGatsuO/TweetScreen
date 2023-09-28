from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

tweets = [
    {"id": 1, "content": "Thanks ChatGPT!!"},
    {"id": 2, "content": "----------------- "}
]

@app.route('/api/tweets', methods=['GET'])
def get_tweets():
    return {"tweets": tweets}

@app.route('/api/tweets', methods=['POST'])
def post_tweet():
    new_tweet = request.json
    tweets.append(new_tweet)
    return jsonify(new_tweet), 201

if __name__ == '__main__':
    app.run(debug=True)