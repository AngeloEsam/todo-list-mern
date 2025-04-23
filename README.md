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

## 🚀 Getting Started

### 📁 Clone the repository

```bash
git clone https://github.com/AngeloEsam/todo-list-mern.git
cd todo-list-mern
--

##  Run Backend
cd backend
npm install
npm run dev

##  Run frontend
cd frontend
npm install
npm run dev
