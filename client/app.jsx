const helper = require('./helper.js');

const TWEETS = (props) => {
    return (
        <div>
            <h3>APP PAGE IS WORKING</h3>
            <h3>WOAH</h3>
        </div>
    );
};

const handleTweet = (e) => {

    return false;
};

const TweetForm = (props) => {
    return (
        <form 
        id='tweetForm'
        onSubmit={handleTweet}
        name="tweetForm"
        action="/app"
        >

        </form>
    );
};

const init = () => {
    ReactDOM.render(<TWEETS/>,
    document.getElementById('tweets'));
};

window.onload = init;
