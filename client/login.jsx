const helper = require('./helper.js');

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2, _csrf});

    return false;
};

const SignUpWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
        >
            <label htmlFor="username">Username: </label>
            <input type="text" id="user" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input type="password" id="pass" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input type="password" id="pass2" name="pass2" placeholder="retype password" />
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, _csrf});

    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input type="text" id="user" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input type="password" id="pass" name="pass" placeholder="password" />
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign In" />
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
    const response = await fetch('/getPublicTweets');
    const data = await response.json();

    ReactDOM.render(
        <TweetList tweets={data.tweets} />,
        document.getElementById('publicTweets')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const signupButton = document.getElementById('signupButton');
    const loginButton = document.getElementById('loginButton');

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignUpWindow csrf={data.csrfToken} />, 
            document.getElementById('loginSignup'));
        
        return false;
    });

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken} />, 
            document.getElementById('loginSignup'));

        return false;
    });

    loadTweetsFromServer();
};

window.onload = init;