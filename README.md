# Kitchen App - Backend

> Multi-tenant kitchen management backend system built with Node.js, Express, MongoDB.

---

## Project Features

- SuperAdmin can create Kitchens and Admins.
- Each Kitchen has its own **separate MongoDB database**.
- Admins can:
  - Login
  - Manage Categories
  - Manage Products inside their own kitchen.
- Dynamic database connection based on Admin login.
- Secure JWT authentication for SuperAdmin and Admins.

---

## Technologies Used

- Node.js (Express.js)
- MongoDB (Local or Atlas)
- Mongoose (ODM)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT Authentication)
- dotenv (Environment configuration)
- multer (for future image uploads)

---

## Project Structure

```
src/
├── config/            # Database connection and dynamic DB logic
├── controllers/       # SuperAdmin and Admin controllers
├── models/            # Mongoose schemas (SuperAdmin + Admin models)
├── middlewares/       # JWT and dynamic DB connection middleware
├── routes/            # API route definitions
├── utils/             # Utility functions (token generation)
├── app.js             # Express server setup
.env                   # Environment variables
package.json           # Project manifest
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd kitchen-app-backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root directory:

```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/superadmin_db
JWT_SECRET=your_jwt_secret_key
```

---

### 4. Run MongoDB locally

If you installed MongoDB manually:

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

## API Endpoints

### SuperAdmin APIs:

| Method | Endpoint                   | Description                |
| :----- | :------------------------- | :------------------------- |
| POST   | `/api/superadmin/login`    | SuperAdmin login           |
| POST   | `/api/superadmin/kitchens` | Create a new Kitchen       |
| GET    | `/api/superadmin/kitchens` | Get all Kitchens           |
| POST   | `/api/superadmin/admins`   | Create Admin for a Kitchen |
| GET    | `/api/superadmin/admins`   | Get all Admins             |

---

### Admin APIs:

| Method | Endpoint                                     | Description                        |
| :----- | :------------------------------------------- | :--------------------------------- |
| POST   | `/api/admin/login`                           | Admin login                        |
| POST   | `/api/admin/categories`                      | Create Category                    |
| GET    | `/api/admin/categories`                      | Get Categories                     |
| POST   | `/api/admin/products`                        | Create Product                     |
| GET    | `/api/admin/products`                        | Get Products                       |
| GET    | `/api/admin/categories/:categoryId/products` | Get Products for specific Category |

---

## Future Improvements

- Image uploads for Products (using multer)
- Admin password reset system
- Pagination and search for products/categories
- Deployment to cloud servers (Render, Railway, VPS)

---

## Developed by

> Botirjon Shokirov

---
