const helper = require('./helper.js');

const Test = (props) => {
    return (
        <h3>IT'S WORKING</h3>
    );
};

const init = () => {
    ReactDOM.render(<Test/>,
    document.getElementById('content'));
};

window.onload = init;