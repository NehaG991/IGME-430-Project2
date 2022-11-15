const helper = require('./helper.js');

const handleTweet = (e) => {
    e.preventDefault();
    helper.hideError();

    const tweet = e.target.querySelector('#tweet').value;
    const privacy = e.target.querySelector('#private').checked;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!tweet) {
        helper.handleError('You must write something');
        return false;
    }

    helper.sendPost(e.target.action, {tweet, privacy, _csrf}, loadTweetsFromServer);

    return false;
};

const TweetForm = (props) => {
    return (
        <form 
        id='tweetForm'
        onSubmit={handleTweet}
        name="tweetForm"
        action="/app"
        method='POST'
        className='tweetForm'
        >
            <label htmlFor="tweet">Tweet: </label>
            <input type="text" id='tweet' name='tweet' placeholder='Write Your Tweet Here' />

            <label htmlFor="private">Private? </label>
            <input type="checkbox" id='private' name='private' />

            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />

            <input type="submit" className='makeTweetSubmit' value="Make Tweet" />
        </form>
    );
};

const TweetList = (props) => {
    if (props.tweets.length === 0) {
        return (
            <div>
                <h3>No Tweets Yet!</h3>
            </div>     
        );
    }

    const tweetNodes = props.tweets.map(tweet => {
        return (
            <div key={tweet._id}>
                <h3>{tweet.tweet}</h3>
            </div>
        );
    });

    return (
        <div>
            {tweetNodes}
        </div>
    );
};

const loadTweetsFromServer = async () => {
    const response = await fetch('/getLogInTweets');
    const data = await response.json();

    ReactDOM.render(
        <TweetList tweets={data.tweets} />,
        document.getElementById('tweets')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <TweetForm csrf={data.csrfToken} />,
        document.getElementById('makeTweet')    
    );

    loadTweetsFromServer();
};

window.onload = init;
