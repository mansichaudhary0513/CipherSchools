💻 Code Prev

A full-stack web application featuring a real-time code editor with collaborative capabilities, secure authentication, and project management tools.
🌟 Features
🖥 Frontend

Code Editor: Monaco Editor integration with syntax highlighting
Real-time Collaboration: Multiple users can code together simultaneously
Project Management: Create, edit, and manage multiple coding projects
Responsive UI: Optimized for desktop and tablet devices
User Authentication: Secure login and signup functionality

⚙️ Backend

RESTful API: Built using Express.js
Authentication: JWT-based authentication system
Database: MongoDB with Mongoose ODM
WebSockets: For live collaboration and updates

🛠 Tech Stack
Frontend

React 19
React Router v7
Monaco Editor
Axios (HTTP client)
Lucide React (icons)
CSS Modules (styling)

Backend

Node.js with Express.js
MongoDB + Mongoose
JSON Web Tokens (JWT)
Bcrypt (password hashing)
CORS enabled
Nodemon (development server)

📁 Project Structure
CipherSchools/
├── backend/                 
│   ├── Config/              
│   ├── Controllers/         
│   │   ├── ApiController.js 
│   │   ├── Auth.js          
│   │   └── AuthMiddelware.js 
│   ├── Models/              
│   │   └── User.js          
│   ├── Routes/              
│   │   ├── ApiRoute.js      
│   │   └── AuthRoute.js     
│   ├── ConnectDb.js         
│   └── Server.js            
│
└── frontend/                
    ├── public/              
    └── src/
        ├── components/      
        │   ├── Header.js    
        │   ├── Dashboard.js 
        │   ├── IDE.js       
        │   └── CodeEditor.js 
        ├── App.js           
        └── index.js         

🚀 Getting Started
Prerequisites

Node.js (v16 or later)
npm or yarn
MongoDB (local instance or cloud)

🧩 Backend Setup

Navigate to the backend directory:cd backend


Install dependencies:npm install


Create a .env file in the backend directory with:PORT=3001
MONGO_URL=mongodb://127.0.0.1:27017/IDE
JWT_SECRET=secretkey
COOKIE_NAME=token


Start the backend server:npm start



🎨 Frontend Setup

Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Create a .env file in the frontend directory:REACT_APP_API_URL=http://localhost:3001


Start the frontend server:npm start


Open the app in your browser:👉 http://localhost:3000

📚 API Endpoints
🔐 Authentication



Method
Endpoint
Description



POST
/api/auth/register
Register a new user


POST
/api/auth/login
Login existing user


GET
/api/auth/me
Get current logged-in user (Protected)


🗂 Projects



Method
Endpoint
Description



GET
/api/projects
Get all projects (Protected)


POST
/api/projects
Create a new project (Protected)


GET
/api/projects/:id
Get a specific project (Protected)


PUT
/api/projects/:id
Update project details (Protected)


DELETE
/api/projects/:id
Delete a project (Protected)


🤝 Contributing

Fork the repository
Create your feature branch:git checkout -b feature/AmazingFeature


Commit your changes:git commit -m "Add some AmazingFeature"


Push the branch:git push origin feature/AmazingFeature


Open a Pull Request 🎉

📄 License
This project is licensed under the ISC License.See the LICENSE file for more details.
🙏 Acknowledgments

Monaco Editor
React
Express.js
MongoDB

Made with ❤️ by Mansi Chaudhary
