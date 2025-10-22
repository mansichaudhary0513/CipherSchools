// NOTE: React and ReactDOM are available globally via CDN.
import { ChildComponent } from './Component.jsx';

const App = () => (
<div style={{ fontFamily: 'Inter, sans-serif', padding: '20px', textAlign: 'center' }}>
<h1>Welcome to the React IDE!</h1>
<ChildComponent name="World" />
</div>
);

const root = document.getElementById('root');
// Use the global ReactDOM, which the CDN exposes
ReactDOM.createRoot(root).render(<App />);