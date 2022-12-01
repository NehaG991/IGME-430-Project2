const helper = require('./helper.js');

const handleTweet = async (e) => {
    e.preventDefault();
    helper.hideError();

    const response = await fetch('/getUsername');
    const data = await response.json();

    const tweet = e.target.querySelector('#tweet').value;
    const privacy = e.target.querySelector('#private').checked;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!tweet) {
        helper.handleError('You must write something');
        return false;
    }

    //console.log(data.username.username);

    const username = data.username.username;

    helper.sendPost(e.target.action, {tweet, privacy, username, _csrf}, loadTweetsFromServer);

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
            <input type="text" id='tweet' name='tweet' placeholder='Write Your Tweet Here' maxLength="280" />

            <label htmlFor="private">Private? </label>
            <input type="checkbox" id='private' name='private' />

            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input type="hidden" id="_username" name="_username" value="" />

            <input type="submit" className='makeTweetSubmit' value="Make Tweet" />
        </form>
    );
};

const deleteTweet = (e) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = document.querySelector('#_csrf').value;
    const _id = e.target.querySelector('#_id').value;

    helper.sendPost(e.target.action, {_id, _csrf}, loadTweetsFromServer);
};

const togglePrivacy = (e) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = document.querySelector('#_csrf').value;
    const _id = e.target.querySelector('#_id').value;
    helper.sendPost(e.target.action, {_id, _csrf}, loadTweetsFromServer);
};

const handleEditTweet = (e) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = document.querySelector('#_csrf').value;
    const _id = e.target.querySelector('#_id').value;
    const newTweet = e.target.querySelector('#tweet').value;

    helper.sendPost(e.target.action, {_id, newTweet, _csrf}, loadTweetsFromServer);
};

const EditTweetWindow = (props) => {
    return (
        <form 
            action="/editTweet"
            name='editTweet'
            method='POST'
            onSubmit={handleEditTweet}
        >
            <input type="hidden" id="_id" name='_id' value={props._id} />
            <input type="text" id='tweet' name='tweet' placeholder='Write Your Tweet Here' maxLength="280" />
            <input type="submit" className='makeTweetSubmit' value="Update Tweet" />
        </form>
    );
};

const renderEditTweetWindow = (e) => {
    e.preventDefault();
    helper.hideError();

    const _id = e.target.querySelector('#_id').value;
    ReactDOM.render(<EditTweetWindow _id={_id} />,
        e.target.querySelector('#editTweetSection'));
};



const TweetList = (props) => {
    if (props.tweets.length === 0) {
        return (
            <div>
                <h3 id='noTweet' >No Tweets Yet!</h3>
            </div>     
        );
    }

    const tweetNodes = props.tweets.slice(0).reverse().map(tweet => {
        let canChange = false;
        let tweetPrivacy = 'Public';
        
        // Checks if user can change tweets
        if (tweet.username === document.getElementById('_username').value) {
            canChange = true;

            // Determines if user owned tweets are public or private
            if (tweet.private === true){
                tweetPrivacy = 'Private';
            }
        };

        if (canChange){
            return (
                <div key={tweet._id} id='tweetBox' >
                    <h3 id='tweetUsername' >{tweet.username}</h3>
                    <h3 id='date' >{tweet.createdDate}</h3>
                    <h3 id='actualTweet' >{tweet.tweet}</h3>
                    <h3 id="tweetPrivacy">{tweetPrivacy}</h3>
                    
                    <form 
                        action="/togglePrivacy"
                        name='togglePrivacy'
                        method='POST'
                        onSubmit={togglePrivacy}
                    >
                        <input type="submit" value="Toggle Privacy?" />
                        <input type="hidden" id="_id" name='_id' value={tweet._id} />
                    </form>

                    <form 
                        id='editTweetButton'
                        onSubmit={renderEditTweetWindow}
                    >
                        <input type="submit" value="Edit Tweet?" />
                        <input type="hidden" id="_id" name='_id' value={tweet._id} />
                        <section id='editTweetSection' ></section>
                    </form>


                    <form 
                        action="/delete"
                        name="deleteButton"
                        method='POST'
                        onSubmit={deleteTweet}
                    >
                        <input type="submit" value="Delete" />
                        <input type="hidden" id="_id" name='_id' value={tweet._id} />
                    </form>
                </div>
            );
        }

        return (
            <div key={tweet._id} id='tweetBox' >
                <h3 id='tweetUsername' >{tweet.username}</h3>
                <h3 id='date' >{tweet.createdDate}</h3>
                <h3 id='actualTweet' >{tweet.tweet}</h3>
            </div>
        );
    });

    return (
        <div>
            {tweetNodes}
        </div>
    );
};

const changePassword = (e) => {
    e.preventDefault();
    helper.hideError();

    const newPass = e.target.querySelector('#pass').value;
    const newPass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!newPass || !newPass2) {
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {newPass, newPass2, _csrf});

    return false;
};

const ChangePasswordWindow = (props) => {
    return (
        <form id='changePasswordForm'
        name='changePasswordForm'
        onSubmit={changePassword}
        action="/changePassword"
        method='POST'
        >
            <label htmlFor="pass">New Password: </label>
            <input type="password" id="pass" name="pass" placeholder="new password" />
            <label htmlFor="pass2">Confirm New Password: </label>
            <input type="password" id="pass2" name="pass2" placeholder="retype new password" />
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>      
    );
};

const changeUsername = (e) => {
    e.preventDefault();
    helper.hideError();

    const oldUsername = document.getElementById('_username').value;
    const newUsername = e.target.querySelector('#user').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, {oldUsername, newUsername, _csrf}, loadTweetsFromServer);

    return false;
};

const ChangeUsernameWindow = (props) => {
    return (
        <form id='changeUsernameForm'
        name='changeUsernameForm'
        onSubmit={changeUsername}
        action="/changeUsername"
        method='POST'
        >
            <label htmlFor="username">New Username: </label>
            <input type="text" id="user" name="username" placeholder="username" />
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Username" />
        </form>      
    );
};

const loadTweetsFromServer = async () => {
    const response = await fetch('/getLogInTweets');
    const data = await response.json();

    const usernameResponse = await fetch('/getUsername');
    const usernameData = await usernameResponse.json();

    const username = usernameData.username.username;
    document.getElementById('_username').value = username;

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

    const changePasswordButton = document.getElementById('changePassword');

    changePasswordButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<ChangePasswordWindow csrf={data.csrfToken} />, 
            document.getElementById("changePasswordSection"))
    });

    const changeUsernameButton = document.getElementById('changeUsername');

    changeUsernameButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<ChangeUsernameWindow csrf={data.csrfToken} />, 
            document.getElementById("changeUsernameSection"))
    });

    loadTweetsFromServer();
};

window.onload = init;
