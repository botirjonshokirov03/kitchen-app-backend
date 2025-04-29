# Kitchen App - Backend

> Multi-tenant kitchen and restaurant management backend system built with Node.js, Express, MongoDB.

---

## 📚 Project Features

- **SuperAdmin** can create Kitchens and Admins.
- Each **Kitchen** has its own **separate MongoDB database** dynamically.
- **Admins** can:
  - Login securely
  - Create and manage Categories
  - Create and manage Products
  - Create and manage Workers (Cashiers, Waiters)
  - Create and manage Tables
  - Calculate Worker working hours for salary tracking
- **Cashiers** (workers) can:
  - Login
  - Check-In / Check-Out (working hours)
  - View Categories and Products
  - Take Orders (select table, waiter, add items)
- **Waiters** (workers) can:
  - Check-In / Check-Out
- Full JWT authentication for all users (SuperAdmin, Admin, Workers).
- Dynamic database connection middleware based on the Kitchen ID.

---

## 🛠 Technologies Used

- Node.js (Express.js)
- MongoDB (Local or Atlas)
- Mongoose (ODM for MongoDB)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT Authentication)
- dotenv (Environment variables)
- multer (Image uploads — for future)
- cors (Cross-Origin Resource Sharing)

---

## 📁 Project Structure

```
src/
├── config/            # Dynamic Database connection logic
├── controllers/       # SuperAdmin, Admin, Worker Controllers
├── models/            # Mongoose Schemas (SuperAdmin, Admin, Workers, Products, Tables, Orders)
├── middlewares/       # Authentication and Dynamic DB middleware
├── routes/            # Route definitions (SuperAdmin, Admin, WorkTrack, Worker)
├── utils/             # Helper functions (Token generation, etc)
├── app.js             # Express app entry point
.env                   # Environment Variables
package.json           # Project manifest
```

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone git@github.com:botirjonshokirov03/kitchen-app-backend.git
cd kitchen-app-backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file:

```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/superadmin_db
JWT_SECRET=your_super_secret_key
```

---

### 4. Start MongoDB locally

```bash
mongod --dbpath /Users/<your-username>/data/db
```

Or install `mongosh` if needed:

```bash
brew install mongosh
mongosh
```

---

### 5. Start the development server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## 🚀 API Endpoints

### SuperAdmin APIs:

| Method | Endpoint                   | Description              |
| :----- | :------------------------- | :----------------------- |
| POST   | `/api/superadmin/login`    | SuperAdmin login         |
| POST   | `/api/superadmin/kitchens` | Create a new Kitchen     |
| GET    | `/api/superadmin/kitchens` | List all Kitchens        |
| POST   | `/api/superadmin/admins`   | Create Admin for Kitchen |
| GET    | `/api/superadmin/admins`   | List all Admins          |

---

### Admin APIs:

| Method | Endpoint                                     | Description                          |
| :----- | :------------------------------------------- | :----------------------------------- |
| POST   | `/api/admin/login`                           | Admin login                          |
| POST   | `/api/admin/categories`                      | Create Category                      |
| GET    | `/api/admin/categories`                      | Get Categories                       |
| POST   | `/api/admin/products`                        | Create Product                       |
| GET    | `/api/admin/products`                        | Get Products                         |
| POST   | `/api/admin/workers`                         | Create Worker (Waiter/Cashier)       |
| GET    | `/api/admin/workers`                         | Get all Workers                      |
| POST   | `/api/admin/tables`                          | Create Table                         |
| GET    | `/api/admin/tables`                          | Get all Tables                       |
| GET    | `/api/admin/workers/:username/working-hours` | Get monthly working hours for Worker |

---

### Worker (Waiter/Cashier) APIs:

| Method | Endpoint               | Description                      |
| :----- | :--------------------- | :------------------------------- |
| POST   | `/api/worker/login`    | Worker login (username/password) |
| POST   | `/api/worker/checkin`  | Worker Check-In                  |
| POST   | `/api/worker/checkout` | Worker Check-Out                 |
| POST   | `/api/worker/orders`   | Create new Order (assign Waiter) |
| GET    | `/api/worker/orders`   | List all Orders                  |

---

## 📈 Future Improvements

- Worker Dashboard: My Profile, My Orders
- Salary Calculation System (automatic based on hours × rate)
- Attendance Reporting (export to CSV / Excel)
- Image uploads for Products
- Pagination and filtering for big kitchens
- Deployment to Render, Railway or VPS hosting
- Real-time WebSocket notification for order updates (future)

---

## 👨‍💻 Developed by

> Botirjon Shokirov

---
