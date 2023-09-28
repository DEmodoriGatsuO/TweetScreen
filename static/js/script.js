// ドキュメントが読み込まれたら、関数を実行
document.addEventListener('DOMContentLoaded', function() {
    fetchTweets();
    attachTweetEvent();
});

// ツイートをフェッチする関数
function fetchTweets() {
    fetch('/api/tweets')
        .then(response => response.json())
        .then(data => displayTweets(data.tweets));
}

// ツイートを表示する関数
function displayTweets(tweets) {
    const tweetsList = document.getElementById('tweets-list');

    tweets.forEach(tweet => {
        const listItem = document.createElement('li');
        listItem.textContent = tweet.content;
        tweetsList.appendChild(listItem);
    });
}

function attachTweetEvent() {
    document.getElementById('tweet-btn').addEventListener("click", function() {
        const tweetContent = document.getElementById('tweet-input').value;
        const newTweet = { content: tweetContent };

        fetch('/api/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTweet)
        })
        .then(response => response.json())
        .then(tweet => {
            displayTweets([tweet]);  // ここでdisplayTweetsを再利用
            document.getElementById('tweet-input').value = "";
        });
    });
}