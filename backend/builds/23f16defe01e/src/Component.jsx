export function ChildComponent({ name }) {
return (
<div style={{ padding: '10px', background: '#ffe0b2', borderRadius: '4px' }}>
<h3>Hello, {name}!</h3>
<p>This component was imported from 'Component.jsx'.</p>
</div>
);
}
