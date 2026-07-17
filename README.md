# Military Asset Management System - Backend

A RESTful backend API built with **Node.js, Express.js, and MongoDB** to manage military assets, bases, equipment, purchases, transfers, assignments, and expenditures with secure JWT authentication and role-based access control.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

## Features

- User Authentication (JWT)
- Role-Based Access Control (Admin, Base Commander, Logistics Officer)
- Base Management
- Equipment Management
- Purchase Management
- Transfer Management
- Assignment Management
- Expenditure Management
- Dashboard API
- Search, Pagination & Sorting

## Installation

```bash
git clone <repository-url>
cd military-asset-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/users`
- `POST /api/users/login`

### Base

- `GET /api/bases`
- `POST /api/bases`

### Equipment

- `GET /api/equipment`
- `POST /api/equipment`

### Purchases

- `GET /api/purchases`
- `POST /api/purchases`

### Transfers

- `GET /api/transfers`
- `POST /api/transfers`

### Assignments

- `GET /api/assignments`
- `POST /api/assignments`

### Expenditures

- `GET /api/expenditures`
- `POST /api/expenditures`

### Dashboard

- `GET /api/dashboard`

## Security

- JWT Authentication
- Password Hashing (bcryptjs)
- Protected Routes
- Role-Based Authorization

## Author

**Keerthi Kothakalva**
