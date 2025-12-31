
# Task Management System – Frontend Developer Assignment

## 📌 Project Overview
This project is a **Task Management System** built as part of a Frontend Developer internship assignment.  
It demonstrates **modern UI design, clean React architecture, authentication flow, and task CRUD operations**, focusing on usability, performance, and scalability.

The application allows users to:
- Register and log in securely
- Access a protected dashboard
- Create, search, filter, complete, and delete tasks
- Experience a modern, professional UI

---

## 🚀 Tech Stack Used

### Frontend
- **React.js**
- **React Router DOM**
- **Axios**
- **CSS Modules**
- Modern UI patterns (Glassmorphism, Gradients, Dark Theme)

### Backend
- **FastAPI**
- **JWT Authentication**
- **MongoDB**
- **bcrypt** for password hashing

---

## ✨ Key Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication
- Protected routes (Dashboard accessible only after login)

### 🏠 Home Page
- Clean landing page
- Login & Register CTAs
- Redirects authenticated users directly to Dashboard

### 📋 Dashboard
- Displays logged-in user profile (name & email)
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Search tasks by title
- Filter tasks (All / Completed / Pending)
- Secure logout

### 🎨 UI / UX Highlights
- Full-page animated gradient backgrounds
- Glassmorphism cards
- Dark-mode inspired dashboard
- Responsive layout
- Clear user flows & intuitive interactions

---

## 📂 Project Structure

```
frontend/
 ├── src/
 │   ├── pages/
 │   │   ├── Home.js
 │   │   ├── Login.js
 │   │   ├── Register.js
 │   │   └── Dashboard.js
 │   │   ├── Home.module.css
 │   │   ├── Login.module.css
 │   │   ├── Register.module.css
 │   │   └── Dashboard.module.css
 │   └── App.js
 │
backend/
 ├── routes/
 │   ├── auth.py
 │   └── tasks.py
 ├── models/
 ├── utils/
 ├── database.py
 └── main.py
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd project-folder
```

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

### 3️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs on: `http://127.0.0.1:8000`

---

## 🔑 Environment Variables

Create a `.env` file in the backend folder:

```
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/
JWT_SECRET=your_secret_key
```

> Note: If your MongoDB password contains special characters (e.g. `@`), encode them properly (`@` → `%40`).

---

## 🧪 API Endpoints (Sample)

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Tasks
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/{id}`
- `DELETE /tasks/{id}`

All protected routes require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🧠 Design & Development Decisions

- **CSS Modules** used for scoped, maintainable styling
- **Component-level separation** for scalability
- **Token-based auth guard** for better UX
- **Minimal dependencies** for faster execution
- UI designed to feel like a real SaaS product

---

## 📈 Exceeding Assignment Expectations

✔ Fully functional backend (not just mock APIs)  
✔ Advanced UI beyond basic templates  
✔ Clean code structure  
✔ Real-world UX considerations  
✔ Production-style dashboard layout  

---

## 📌 Conclusion

This project showcases my ability to:
- Build real-world React applications
- Design professional UIs
- Integrate frontend with backend APIs
- Write clean, scalable, and secure code

I approached this assignment with the goal of delivering **more than the minimum requirements**, focusing on quality, usability, and clarity.

---

## 👤 Author
**Rama Sai Shashank**  
Frontend Developer Intern Applicant

Thank you for reviewing my submission 🙏
