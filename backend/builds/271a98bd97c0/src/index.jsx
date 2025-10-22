import React from 'react';
import Greeting from './Component.jsx';

const App = () => React.createElement('div', null, 
  React.createElement('h1', null, 'Web IDE Project 👋'),
  React.createElement(Greeting)
);

const { createRoot } = ReactDOM;
const root = document.getElementById('root');
createRoot(root).render(React.createElement(App));