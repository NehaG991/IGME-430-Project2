const helper = require('./helper.js');

const TEST = (props) => {
    return (
        <div>
            <h3>APP PAGE IS WORKING</h3>
            <h3>WOAH</h3>
        </div>
    );
};

const init = () => {
    ReactDOM.render(<TEST/>,
    document.getElementById('tweets'));
};

window.onload = init;
