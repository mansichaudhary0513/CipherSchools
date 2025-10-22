
import React, { useState, useCallback, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';
import styles from './CodeEditor.module.css';

const initialFileTree = {
  name: 'root',
  type: 'folder',
  path: '',
  children: [
    {
      name: 'App.js',
      type: 'file',
      path: '/App.js',
      content: `import './App.css';
import Home from "./Home"; 
function App() { 
  return (<div className="App"><Home /></div>); 
} 
export default App;`
    },
    {
      name: 'Home.js',
      type: 'file',
      path: '/Home.js',
      content: `import './Home.css';
function Home() { 
  return (
    <div className="home-box">
      <h2>Hello, this is a simple box!</h2>
      <p>Welcome to the Home component.</p>
    </div>
  ); 
} 
export default Home;`
    },
    {
      name: 'App.css',
      type: 'file',
      path: '/App.css',
      content: `.App { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
  background-color: #f0f2f5; 
  font-family: Arial, sans-serif; 
}`
    },
    {
      name: 'Home.css',
      type: 'file',
      path: '/Home.css',
      content: `.home-box { 
  background-color: white; 
  border-radius: 12px; 
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
  padding: 30px; 
  text-align: center; 
  width: 300px; 
} 
.home-box h2 { color: #333; margin-bottom: 10px; } 
.home-box p { color: #666; font-size: 14px; }`
    }
  ]
};

function findNode(tree, path) {
  if (!tree) return null;
  const parts = path.split('/').filter(Boolean);
  let current = tree;
  for (const part of parts) {
    const child = current.children ? current.children.find(c => c.name === part) : null;
    if (!child) return null;
    current = child;
  }
  return current;
}

function updateFileContent(tree, path, newContent) {
  const parts = path.split('/').filter(Boolean);
  let newTree = { ...tree };
  let current = newTree;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const childIndex = current.children.findIndex(c => c.name === part);
    if (childIndex === -1) return tree;
    const newChild = { ...current.children[childIndex] };
    current.children = [...current.children];
    current.children[childIndex] = newChild;
    current = newChild;
  }
  current.content = newContent;
  return newTree;
}

function addChildToTree(tree, parentPath, newNode) {
  const effectiveParentPath = parentPath === '/' ? '' : parentPath;
  if (!effectiveParentPath) {
    return {
      ...tree,
      children: [...tree.children, newNode]
    };
  }
  const parts = effectiveParentPath.split('/').filter(Boolean);
  let newTree = { ...tree };
  let current = newTree;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const childIndex = current.children.findIndex(c => c.name === part);
    if (childIndex === -1) return tree;
    const newChild = { ...current.children[childIndex] };
    current.children = [...current.children];
    current.children[childIndex] = newChild;
    current = newChild;
  }
  current.children = [...(current.children || []), newNode];
  return newTree;
}

function addNode(tree, parentPath, name, type) {
  const effectiveParentPath = parentPath === '/' ? '' : parentPath;
  const newNodePath = effectiveParentPath ? `${effectiveParentPath}/${name}` : `/${name}`;
  const newNode = {
    name,
    type,
    path: newNodePath,
    ...(type === 'file' ? { content: '' } : { children: [] })
  };
  return addChildToTree(tree, effectiveParentPath, newNode);
}

function deleteNode(tree, path) {
  const parts = path.split('/').filter(Boolean);
  let newTree = { ...tree };
  let current = newTree;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const childIndex = current.children.findIndex(c => c.name === part);
    if (childIndex === -1) return tree;
    const newChild = { ...current.children[childIndex] };
    current.children = [...current.children];
    current.children[childIndex] = newChild;
    current = newChild;
  }
  const lastPart = parts[parts.length - 1];
  current.children = current.children.filter(c => c.name !== lastPart);
  return newTree;
}

function FileTree({ node, level = 0, onSelect, selectedPath, onToggle, expandedPaths, onContextMenu, currentDirectory, onSetCurrentDirectory, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(expandedPaths.has(node.path));
  const itemRef = useRef(null);

  useEffect(() => {
    setIsExpanded(expandedPaths.has(node.path));
  }, [expandedPaths, node.path]);

  const paddingLeft = `${level * 16 + 8}px`;

  const handleClick = (e) => {
    e.stopPropagation();
    if (node.type === 'folder') {
      const newExpanded = !isExpanded;
      onToggle(node.path);
      setIsExpanded(newExpanded);
      if (!newExpanded) {
        onSetCurrentDirectory('');
      }
    } else {
      onSelect(node.path);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(node.path);
  };

  const handleContext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onContextMenu({
      path: node.path,
      name: node.name,
      type: node.type,
      x: e.clientX,
      y: e.clientY
    });
    onSetCurrentDirectory(node.path);
  };

  const itemContent = (
    <>
      <span className={styles.icon}>
        {node.type === 'file' ? (
          <i className="fa fa-file-code-o"></i>
        ) : isExpanded ? (
          <i className="fa fa-folder-open"></i>
        ) : (
          <i className="fa fa-folder"></i>
        )}
      </span>
      <span className={styles.name}>{node.name}</span>
      {node.path !== '' && (
        <button className={styles.deleteButton} onClick={handleDeleteClick} title="Delete">
          <i className="fa fa-trash"></i>
        </button>
      )}
    </>
  );

  if (node.type === 'file') {
    return (
      <div
        ref={itemRef}
        className={`${styles.fileItem} ${selectedPath === node.path ? styles.selected : ''}`}
        style={{ paddingLeft }}
        onClick={handleClick}
        onContextMenu={handleContext}
      >
        {itemContent}
      </div>
    );
  }

  return (
    <div>
      <div
        ref={itemRef}
        className={`${styles.folderItem} ${currentDirectory === node.path ? styles.currentDir : ''}`}
        style={{ paddingLeft }}
        onClick={handleClick}
        onContextMenu={handleContext}
      >
        {itemContent}
      </div>
      {isExpanded && node.children && node.children.map(child => (
        <FileTree
          key={child.path}
          node={child}
          level={level + 1}
          onSelect={onSelect}
          selectedPath={selectedPath}
          onToggle={onToggle}
          expandedPaths={expandedPaths}
          onContextMenu={onContextMenu}
          currentDirectory={currentDirectory}
          onSetCurrentDirectory={onSetCurrentDirectory}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function ContextMenu({ visible, x, y, options, onClose, onAction }) {
  if (!visible) return null;

  return (
    <div className={styles.contextMenu} style={{ left: x, top: y }}>
      {options.map((option, index) => (
        <div key={index} className={styles.menuItem} onClick={() => { onAction(option); onClose(); }}>
          {option.label}
        </div>
      ))}
    </div>
  );
}

function Editor({ projectId }) {
  const navigate = useNavigate();
  const [fileTree, setFileTree] = useState(initialFileTree);
  const [projectName, setProjectName] = useState('Default');
  const [selectedPath, setSelectedPath] = useState('/App.js');
  const [currentContent, setCurrentContent] = useState(initialFileTree.children[0].content);
  const [newNodeName, setNewNodeName] = useState('');
  const [isFolder, setIsFolder] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('');
  const [expandedPaths, setExpandedPaths] = useState(new Set(['']));
  const [isLoading, setIsLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, options: [], path: '', type: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleSelect = useCallback((path) => {
    setSelectedPath(path);
    const node = findNode(fileTree, path);
    if (node && node.type === 'file') {
      setCurrentContent(node.content || '');
    }
  }, [fileTree]);

  const handleEditorChange = useCallback((value) => {
    setCurrentContent(value || '');
    if (selectedPath) {
      setFileTree(prev => updateFileContent(prev, selectedPath, value || ''));
    }
  }, [selectedPath]);

  const handleCreateNode = () => {
    if (!newNodeName.trim()) return;
    const effectiveDir = currentDirectory || '';
    setFileTree(prev => addNode(prev, effectiveDir, newNodeName, isFolder ? 'folder' : 'file'));
    const newPath = effectiveDir ? `${effectiveDir}/${newNodeName}` : `/${newNodeName}`;
    if (isFolder) {
      setExpandedPaths(prev => new Set([...Array.from(prev), newPath]));
    }
    setNewNodeName('');
    setIsFolder(false);
    setShowCreate(false);
  };

  const handleToggleFolder = (path) => {
    setExpandedPaths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleDelete = useCallback((path) => {
    if (path === '') return;
    const node = findNode(fileTree, path);
    const confirmMsg = `Delete ${node.type} "${node.name}"?`;
    if (window.confirm(confirmMsg)) {
      setFileTree(prev => deleteNode(prev, path));
      setExpandedPaths(prev => {
        const newSet = new Set(prev);
        newSet.delete(path);
        return newSet;
      });
      if (selectedPath === path) {
        setSelectedPath('');
        setCurrentContent('');
      }
      if (currentDirectory === path) {
        setCurrentDirectory('');
      }
    }
  }, [selectedPath, currentDirectory, fileTree]);

  const handleContextMenu = useCallback((info) => {
    let options = [];
    if (info.type === 'folder') {
      options = [
        { label: 'New File', action: 'newFile' },
        { label: 'New Folder', action: 'newFolder' },
        { label: 'Delete Folder', action: 'delete' }
      ];
    } else {
      options = [
        { label: 'Delete File', action: 'delete' }
      ];
    }
    setContextMenu({
      visible: true,
      x: info.x,
      y: info.y,
      options,
      path: info.path,
      type: info.type
    });
  }, []);

  const handleContextAction = useCallback((option) => {
    if (option.action === 'newFile') {
      setShowCreate(true);
      setIsFolder(false);
      setCurrentDirectory(contextMenu.path);
      setNewNodeName('');
    } else if (option.action === 'newFolder') {
      setShowCreate(true);
      setIsFolder(true);
      setCurrentDirectory(contextMenu.path);
      setNewNodeName('');
    } else if (option.action === 'delete') {
      handleDelete(contextMenu.path);
    }
  }, [contextMenu, handleDelete]);

  const handleCloseContext = useCallback(() => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: fileTree }),
        credentials:'include'
      });
      if (response.ok) {
        alert('Saved successfully!');
      } else {
        alert('Save failed!');
      }
    } catch (error) {
      console.error(error);
      alert('Save failed!');
    }
  };

  const handleLoad = async (showAlert = false) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
        credentials:'include'
      });
      if (response.ok) {
        const data = await response.json();
        setFileTree(data.files);
        setProjectName(data.name);
        const appNode = findNode(data.files, '/App.js');
        if (appNode) {
          setSelectedPath('/App.js');
          setCurrentContent(appNode.content);
        } else {
          setSelectedPath('');
          setCurrentContent('');
        }
        setExpandedPaths(new Set(['']));
        if (showAlert) {
          alert('Loaded successfully!');
        }
      } else {
        setFileTree(initialFileTree);
        setProjectName('Default');
        setSelectedPath('/App.js');
        setCurrentContent(initialFileTree.children[0].content);
        setExpandedPaths(new Set(['']));
        if (showAlert) {
          alert('Load failed! Using default project.');
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setFileTree(initialFileTree);
      setProjectName('Default');
      setSelectedPath('/App.js');
      setCurrentContent(initialFileTree.children[0].content);
      setExpandedPaths(new Set(['']));
      if (showAlert) {
        alert('Load failed! Using default project.');
      }
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm(`Delete project "${projectName}"?`)) {
      try {
        const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
          method: 'DELETE',
          credentials:'include'
        });
        if (response.ok) {
          alert('Project deleted successfully!');
          navigate('/dashboard');
        } else {
          alert('Delete failed!');
        }
      } catch (error) {
        console.error(error);
        alert('Delete failed!');
      }
    }
  };

  const handlePreview = () => {
    navigate(`/preview/${projectId}`);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    handleLoad(false);
  }, [projectId]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        handleCloseContext();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu.visible, handleCloseContext]);

  const selectedNode = findNode(fileTree, selectedPath);

  if (isLoading || !fileTree) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={`${styles.editorContainer} ${theme === 'light' ? styles.lightTheme : styles.darkTheme}`}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <ContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        options={contextMenu.options}
        onClose={handleCloseContext}
        onAction={handleContextAction}
      />
      
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <button onClick={() => navigate('/dashboard')} className={styles.topBarButton} title="Back to Dashboard">
            <i className="fa fa-arrow-left"></i>
          </button>
          <span className={styles.projectName}>{projectName}</span>
        </div>
        <div className={styles.topBarRight}>
          <button onClick={handleSave} className={styles.topBarButton} title="Save">
            <i className="fa fa-save"></i>
          </button>
          <button onClick={() => handleLoad(true)} className={styles.topBarButton} title="Reload">
            <i className="fa fa-refresh"></i>
          </button>
          <button onClick={handlePreview} className={styles.topBarButton} title="Preview">
            <i className="fa fa-eye"></i>
          </button>
          <button onClick={handleDeleteProject} className={styles.topBarButton} title="Delete Project">
            <i className="fa fa-trash"></i>
          </button>
          <button onClick={toggleTheme} className={styles.topBarButton} title="Toggle Theme">
            <i className={`fa ${theme === 'dark' ? 'fa-sun-o' : 'fa-moon-o'}`}></i>
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarTitle}>EXPLORER</span>
            <div className={styles.sidebarActions}>
              <button
                onClick={() => {
                  setShowCreate(true);
                  setIsFolder(false);
                  setCurrentDirectory(currentDirectory || '');
                  setNewNodeName('');
                  handleCloseContext();
                }}
                className={styles.iconButton}
                title="New File"
              >
                <i className="fa fa-file-o"></i>
              </button>
              <button
                onClick={() => {
                  setShowCreate(true);
                  setIsFolder(true);
                  setCurrentDirectory(currentDirectory || '');
                  setNewNodeName('');
                  handleCloseContext();
                }}
                className={styles.iconButton}
                title="New Folder"
              >
                <i className="fa fa-folder-o"></i>
              </button>
            </div>
          </div>
          
          {showCreate && (
            <div className={styles.createSection}>
              <input
                type="text"
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
                placeholder={isFolder ? "Folder name" : "File name"}
                className={styles.input}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleCreateNode()}
              />
              <div className={styles.createActions}>
                <button onClick={handleCreateNode} className={styles.createButton}>
                  <i className="fa fa-check"></i>
                </button>
                <button onClick={() => { setShowCreate(false); setNewNodeName(''); }} className={styles.cancelButton}>
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
          )}
          
          <div className={styles.tree}>
            <FileTree
              node={fileTree}
              onSelect={handleSelect}
              selectedPath={selectedPath}
              onToggle={handleToggleFolder}
              expandedPaths={expandedPaths}
              onContextMenu={handleContextMenu}
              currentDirectory={currentDirectory}
              onSetCurrentDirectory={setCurrentDirectory}
              onDelete={handleDelete}
            />
          </div>
        </div>

        <div className={styles.editorPanel}>
          <div className={styles.editorHeader}>
            <div className={styles.tab}>
              <i className="fa fa-file-code-o"></i>
              <span>{selectedNode ? selectedNode.name : 'Select a file'}</span>
            </div>
          </div>
          <div className={styles.editorContent}>
            <MonacoEditor
              height="100%"
              defaultLanguage="javascript"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={currentContent}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                fontFamily: 'Consolas, "Courier New", monospace',
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                automaticLayout: true
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;






