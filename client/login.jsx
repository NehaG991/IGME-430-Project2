const helper = require('./helper.js');

const PublicTweets = (props) => {
    return (
        <div>
            <h3>IT'S WORKING</h3>
            <h3>WOAH</h3>
        </div>
    );
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const accountName = e.target.querySelector('#name').value;
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

    helper.sendPost(e.target.action, {username, pass, pass2, accountName, _csrf});

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
            <label htmlFor="accountName">Account Name: </label>
            <input type="text" id="name" name="name" placeholder="Account Name" />
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

const init = async () => {
    ReactDOM.render(<PublicTweets/>,
    document.getElementById('publicTweets'));

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
};

window.onload = init;