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

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <TweetForm csrf={data.csrfToken} />,
        document.getElementById('makeTweet')    
    );


    ReactDOM.render(<TWEETS/>,
    document.getElementById('tweets'));
};

window.onload = init;
