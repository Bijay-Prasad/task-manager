# 🧠 Task Management System – Admin Panel

A modern, full-featured Task Management System with role-based access control (RBAC), built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This Admin Panel allows administrators to manage tasks and users efficiently with advanced features like filters, pagination, modals, search, and role assignment.

## 🔍 Features

- 🧑‍💼 **Role-Based Access (RBAC)**:
  - `ADMIN`: Full control – view, update, delete tasks and manage user roles.
  - `MANAGER`: Manage own created tasks and update it.
  - `USER`: Update status of assigned tasks.

- ✅ **Task Management**
  - View, filter (by status and due date), search, sort
  - Pagination support
  - Drag-and-drop UI-ready design
  - Edit and Delete support with modals

- 👥 **User Management**
  - View all users
  - Change roles (USER, MANAGER, ADMIN)
  - Delete users
  - Responsive design with modern UI

- 🔒 **Authentication**
  - Login system (JWT/OAuth ready)
  - Protected routes based on user roles

- 📱 **Responsive UI**
  - Mobile-collapsible sidebar
  - Smooth animations and toast notifications
  - Avatar with user initials and logout dropdown

---

## ⚙️ Technologies Used

### Frontend:
- [Next.js](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

### Backend:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/task-management-admin.git
cd task-management-admin
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables
Create a .env file in the backend directory with the following keys:
```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## 📂 Project Structure
```arduino
├── task-manager
│
├── frontend/
│   ├── components/
│   ├── app/
│   │   ├── page.js
│   │   ├── admin/
│   │   ├── login/
│   │   └── register/
│   └── State/
│       ├── store.js
│       ├── Admin/User/
│       ├── User/
│       └── Task/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middlewares/
└── README.md
```

## 🧪 Demo & Screenshots

### Dashboard overview
App Screenshot

Task and User tables

Edit modal

Responsive view

----

## 🙌 Contribution
We welcome contributions to improve the functionality, fix bugs, or enhance UI.

### How to Contribute:
  ##### 1. Fork this repository
  ##### 2. Create a new branch git checkout -b feature/YourFeature
  ##### 3. Commit your changes git commit -m "Added YourFeature"
  ###### 4. Push to your fork git push origin feature/YourFeature
  ###### 5. Create a Pull Request

---

## 📄 License
This project is open-source and available under the [MIT License.](https://choosealicense.com/licenses/mit/)