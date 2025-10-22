import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import Editor from './CodeEditor';
import IDE from './IDE';
import Login from "./Auth/Login";
import Signup from "./Auth/Signup"
import Header from './Header';
import './App.css'; 

function EditorWrapper() {
  const { projectId } = useParams();
  return <Editor projectId={projectId} />;
}


function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:projectId" element={<EditorWrapper />} />
          <Route path="/preview/:projectId" element={<IDE />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;