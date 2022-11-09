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
    console.log('SIGNING UP');

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
            <input className="formSubmit" type="submit" value="Sign In" />
        </form>
    );
};

const handleLogin = (e) => {
    console.log('LOGGING IN');

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

const init = () => {
    ReactDOM.render(<PublicTweets/>,
    document.getElementById('publicTweets'));

    const signupButton = document.getElementById('signupButton');
    const loginButton = document.getElementById('loginButton');

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignUpWindow/>, 
            document.getElementById('loginSignup'));
        
        return false;
    });

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow/>, 
            document.getElementById('loginSignup'));

        return false;
    });
};

window.onload = init;