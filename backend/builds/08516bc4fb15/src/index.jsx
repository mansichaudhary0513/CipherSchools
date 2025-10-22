const App = () => <div><h1>Hello from the web IDE 👋</h1></div>;
const { createRoot } = ReactDOM;
const root = document.getElementById('root');
createRoot(root).render(<App />);