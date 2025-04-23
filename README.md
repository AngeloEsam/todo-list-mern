# 📝 To-Do List App with User Authentication (MERN Stack)

This is a full-stack To-Do List application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). It supports user authentication, CRUD operations on to-do items, task filtering, and a search feature.

## 📦 Features

### 🔐 Authentication
- User registration with name, email, phone, and password
- Secure password hashing using **bcrypt**
- Login and logout using **JWT tokens**
- Protected routes (backend & frontend)

### ✅ To-Do Functionality
- Add, edit, delete to-do items
- Each to-do includes: title, description, due date, and status (pending/completed)
- Filter tasks by status (pending/completed)
- Search tasks by title
- View only tasks for the authenticated user

## 🧰 Tech Stack

| Layer      | Tech                           |
|------------|--------------------------------|
| Frontend   | React, React Router, Tailwind CSS |
| Backend    | Node.js, Express.js            |
| Database   | MongoDB with Mongoose          |
| Auth       | JWT, bcrypt                    |
| Dev Tools  | Vite, ESLint, Nodemon          |

---

<pre> ## 📂 Project Structure ```bash todo-auth-app/ │ ├── backend/ │ ├── config/ # Database connection config (db.js) │ ├── controllers/ # Request handlers (authController.js, todoController.js) │ ├── middleware/ # Authentication middleware (auth.js) │ ├── models/ # Mongoose models (User.js, Todo.js) │ ├── routes/ # Route definitions (auth.js, todo.js) │ ├── .env # Environment variables │ └── server.js # Entry point for the backend │ └── frontend/ ├── components/ # Reusable UI components (e.g., Header.jsx) ├── pages/ # Page components (Login.jsx, Register.jsx, Home.jsx) ├── utils/ # Route guards (ProtectedRoute.jsx, PublicRoute.jsx) ├── App.jsx # Main app component └── main.jsx # Frontend entry point ``` </pre>



## 🚀 Getting Started

### 📁 Clone the repository

```bash
git clone https://github.com/AngeloEsam/todo-list-mern.git
cd todo-list-mern
