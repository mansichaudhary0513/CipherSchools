// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Editor from './CodeEditor';
// import styles from './Dashboard.module.css';

// const initialFileTree = {
//   name: 'root',
//   type: 'folder',
//   path: '',
//   children: [
//     {
//       name: 'App.js',
//       type: 'file',
//       path: '/App.js',
//       content: `import './App.css';
// import Home from "./Home"; 
// function App() { 
//   return (<div className="App"><Home /></div>); 
// } 
// export default App;`
//     },
//     {
//       name: 'Home.js',
//       type: 'file',
//       path: '/Home.js',
//       content: `import './Home.css';
// function Home() { 
//   return (
//     <div className="home-box">
//       <h2>Hello, this is a simple box!</h2>
//       <p>Welcome to the Home component.</p>
//     </div>
//   ); 
// } 
// export default Home;`
//     },
//     {
//       name: 'App.css',
//       type: 'file',
//       path: '/App.css',
//       content: `.App { 
//   display: flex; 
//   justify-content: center; 
//   align-items: center; 
//   height: 100vh; 
//   background-color: #f0f2f5; 
//   font-family: Arial, sans-serif; 
// }`
//     },
//     {
//       name: 'Home.css',
//       type: 'file',
//       path: '/Home.css',
//       content: `.home-box { 
//   background-color: white; 
//   border-radius: 12px; 
//   box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
//   padding: 30px; 
//   text-align: center; 
//   width: 300px; 
// } 
// .home-box h2 { color: #333; margin-bottom: 10px; } 
// .home-box p { color: #666; font-size: 14px; }`
//     }
//   ]
// };

// function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/users/verify', {
//         credentials: 'include'
//       });

   
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setUsername(data.user.fullName || 'Developer');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/projects', {
//         credentials: 'include'
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setProjects(data);
//       } else {
//         setProjects([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setProjects([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//     fetchProjects();
//   }, []);

//   const createProject = async (name) => {
//     if (!name.trim()) return;
//     try {
//       const response = await fetch('http://localhost:3001/api/projects', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: name.trim(), files: initialFileTree }),
//         credentials: 'include'
//       });
//       if (response.ok) {
//         const newProject = await response.json();
//         setProjects(prev => [...prev, { id: newProject.id, name: newProject.name }]);
//       } else {
//         alert('Failed to create project');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Failed to create project');
//     }
//   };

//   const deleteProject = async (id) => {
//     const projectName = projects.find(p => p.id === id)?.name;
//     if (window.confirm(`Delete project "${projectName}"?`)) {
//       try {
//         const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
//           method: 'DELETE',
//           credentials: 'include'
//         });
//         if (response.ok) {
//           setProjects(prev => prev.filter(p => p.id !== id));
//         } else {
//           alert('Failed to delete project');
//         }
//       } catch (error) {
//         console.error(error);
//         alert('Failed to delete project');
//       }
//     }
//   };

//   const openProject = (id) => {
//     navigate(`/editor/${id}`);
//   };

//   const handleNewProject = () => {
//     const name = prompt('Enter project name:');
//     if (name) {
//       createProject(name);
//     }
//   };

//   if (isLoading) {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   return (
//     <div className={styles.dashboard}>
//       <div className={styles.hero}>
//         <div className={styles.heroContent}>
//           <svg className={styles.heroIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="currentColor"/>
//           </svg>
//           <h1 className={styles.heroTitle}>Welcome back, {username}</h1>
//           <p className={styles.heroSubtitle}>Build, manage and deploy your React projects with ease</p>
//           <button onClick={handleNewProject} className={styles.heroButton}>
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//             Create New Project
//           </button>
//         </div>
//       </div>

//       <div className={styles.projectsSection}>
//         <div className={styles.sectionHeader}>
//           <h2 className={styles.sectionTitle}>Your Projects</h2>
//           <span className={styles.projectCount}>{projects.length} {projects.length === 1 ? 'project' : 'projects'}</span>
//         </div>
        
//         <div className={styles.grid}>
//           {projects.length === 0 ? (
//             <div className={styles.empty}>
//               <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               <p className={styles.emptyText}>No projects yet</p>
//               <p className={styles.emptySubtext}>Create your first project to get started</p>
//             </div>
//           ) : (
//             projects.map((project) => (
//               <div key={project.id} className={styles.card}>
//                 <div className={styles.cardHeader}>
//                   <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h3 className={styles.cardTitle}>{project.name}</h3>
//                 <div className={styles.cardActions}>
//                   <button onClick={() => openProject(project.id)} className={styles.openButton}>
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     Open
//                   </button>
//                   <button onClick={() => deleteProject(project.id)} className={styles.deleteButton}>
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

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

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/verify', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.user.fullName || 'Developer');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/projects', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProjects();
  }, []);

  const createProject = async (name) => {
    if (!name.trim()) return;
    try {
      const response = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), files: initialFileTree }),
        credentials: 'include'
      });
      if (response.ok) {
        const newProject = await response.json();
        setProjects(prev => [...prev, { id: newProject.id, name: newProject.name }]);
      } else {
        alert('Failed to create project');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create project');
    }
  };

  const deleteProject = async (id) => {
    const projectName = projects.find(p => p.id === id)?.name;
    if (window.confirm(`Delete project "${projectName}"?`)) {
      try {
        const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
          setProjects(prev => prev.filter(p => p.id !== id));
        } else {
          alert('Failed to delete project');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to delete project');
      }
    }
  };

  const openProject = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleNewProject = () => {
    const name = prompt('Enter project name:');
    if (name) {
      createProject(name);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.headerInfo}>
            <div className={styles.branding}>
                <svg className={styles.logo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22h20L12 2z" stroke="#58a6ff" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 5L7 15h10L12 5z" fill="#58a6ff"/>
                </svg>
                <span className={styles.appName}>Code Prev</span>
            </div>
            <div className={styles.userInfo}>
                <span className={styles.username}>{username}</span>
                <div className={styles.avatar}>{username.charAt(0)}</div>
            </div>
          </div>
          <h1 className={styles.heroTitle}>Your Workspace, Your Code</h1>
          <p className={styles.heroSubtitle}>Build, manage, and collaborate on your React projects.</p>
          <button onClick={handleNewProject} className={styles.heroButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New Project
          </button>
        </div>

        <div className={styles.projectsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Projects</h2>
            <span className={styles.projectCount}>{projects.length} {projects.length === 1 ? 'Project' : 'Projects'}</span>
          </div>
          
          <div className={styles.grid}>
            {projects.length === 0 ? (
              <div className={styles.empty}>
                <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2v7h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className={styles.emptyText}>No projects yet</p>
                <p className={styles.emptySubtext}>Click "New Project" to start coding.</p>
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className={styles.cardTitle}>{project.name}</h3>
                  </div>
                  <div className={styles.cardActions}>
                    <button onClick={() => openProject(project.id)} className={styles.openButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Open Editor
                    </button>
                    <button onClick={() => deleteProject(project.id)} className={styles.deleteButton} title="Delete Project">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;







