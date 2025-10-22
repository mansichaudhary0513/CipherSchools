import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function flattenTree(node, files = {}) {
  if (node.type === "file") {
    const filename = node.path.split("/").pop();
    if (filename) {
      files[filename] = node.content;
    }
  } else if (node.type === "folder" && node.children) {
    node.children.forEach((child) => flattenTree(child, files));
  }
  return files;
}

const initialFiles = {
  "App.js": `import './App.css';
import Home from "./Home";
function App() {
  return (<div className="App"><Home /></div>);
}
export default App;`,

  "Home.js": `import './Home.css';
function Home() {
  return (
    <div className="home-box">
      <h2>Hello, this is a simple box!</h2>
      <p>Welcome to the Home component.</p>
    </div>
  );
}
export default Home;`,

  "App.css": `.App {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
}`,

  "Home.css": `.home-box {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 30px;
  text-align: center;
  width: 300px;
}
.home-box h2 { color: #333; margin-bottom: 10px; }
.home-box p { color: #666; font-size: 14px; }`,
};

function IDE() {
  const [files, setFiles] = useState({});
  const { projectId } = useParams();

  useEffect(() => {
    if (!projectId) {
      setFiles(initialFiles);
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/projects/${projectId}`,
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          const flattened = flattenTree(data.files);
          setFiles(flattened);
        } else {
          console.warn("Project not found, using initial files");
          setFiles(initialFiles);
        }
      } catch (error) {
        console.error("Failed to fetch files:", error);
        setFiles(initialFiles);
      }
    };

    fetchFiles();
  }, [projectId]);

  const generatePreviewHtml = () => {
    if (Object.keys(files).length === 0) {
      return "<html><body><h1>Loading...</h1></body></html>";
    }

    const jsFiles = Object.keys(files).filter((k) => k.endsWith(".js"));
    const graph = {};
    const processedCodes = {};
    const allCss = new Set();

    jsFiles.forEach((jsFile) => {
      graph[jsFile] = [];
      const code = files[jsFile];
      const lines = code.split("\n");
      const processedLines = [];

      lines.forEach((line) => {
        if (line.trim().startsWith("import ")) {
          if (line.includes(".css")) {
            const pathMatch = line.match(/['"]([^'"]+\.css)['"]/);
            if (pathMatch) {
              const cssPath = pathMatch[1].replace("./", "");
              if (files[cssPath]) {
                allCss.add(files[cssPath]);
              }
            }
            return;
          } else {
            const pathMatch = line.match(/from\s+['"]([^'"]+)['"]/);
            if (pathMatch) {
              let jsPath = pathMatch[1].replace("./", "");
              if (!jsPath.endsWith(".js")) jsPath += ".js";
              if (jsFiles.includes(jsPath)) {
                graph[jsFile].push(jsPath);
              }
            }
            return;
          }
        }
        processedLines.push(line);
      });

      let processedCode = processedLines.join("\n").trim();
      processedCode = processedCode
        .replace(/export\s+default\s+\w+;?\s*$/im, "")
        .trim();
      processedCodes[jsFile] = processedCode;
    });

    const visited = new Set();
    const stack = [];

    function dfs(node) {
      visited.add(node);
      graph[node].forEach((neigh) => {
        if (!visited.has(neigh)) {
          dfs(neigh);
        }
      });
      stack.push(node);
    }

    if (jsFiles.includes("App.js")) {
      dfs("App.js");
      const order = stack.reverse();
      let jsCode = order.map((file) => processedCodes[file]).join("\n") + "\n";

      const renderCode = `
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
`;

      jsCode += renderCode;
      const css = Array.from(allCss).join("\n");

      return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>React Preview</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
${jsCode}
  </script>
</body>
</html>
`;
    }

    return "<html><body><h1>Error: App.js not found</h1></body></html>";
  };

  const previewHtml = generatePreviewHtml();

  return (
    <div style={{ 
      height: "100%", 
      width: "100%", 
      backgroundColor: "#f9f9f9",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      <div
        style={{
          padding: "10px 15px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          fontWeight: "bold",
          flexShrink: 0
        }}
      >
        Preview
      </div>
      <iframe
        srcDoc={previewHtml}
        style={{ 
          width: "100%", 
          flex: 1,
          border: "none",
          overflow: "auto"
        }}
        title="Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}

export default IDE;