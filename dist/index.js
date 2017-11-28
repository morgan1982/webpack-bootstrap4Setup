import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

const App = () => {

    return (
        <div>
            <div>Hello From</div>
            <ul>
                <li>React</li>
                <li>Sass</li>
                <li>Webpack 3</li>
                <li>Bootstrap 4</li>
                <li>Font Aweasome</li>
            </ul>
        </div>

    )
}

ReactDOM.render(
    <App />, document.getElementById('app')
);