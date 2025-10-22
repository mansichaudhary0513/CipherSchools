const App = () => React.createElement('div', null, React.createElement('h1', null, 'Hello from the web IDE 👋'));
const { createRoot } = ReactDOM;
const root = document.getElementById('root');
createRoot(root).render(React.createElement(App));