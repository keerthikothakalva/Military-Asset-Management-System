# Military Asset Management System

A full-stack web application built using the MERN stack to manage military assets across multiple bases.

The system enables authorized users to manage bases, equipment, opening balances, purchases, transfers, assignments, and expenditures. It also provides dashboard analytics, JWT authentication, role-based access control, and audit logging for improved transparency and accountability.

## Live Demo

### Frontend
[View Live Application](YOUR_FRONTEND_DEPLOYMENT_LINK)

### Backend API
[View Backend API](https://military-asset-management-system-20j3.onrender.com)


## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- JSX
- Bootstrap
- CSS
- Axios
- React Icons

### Backend

- Node.js
- Express.js
- RESTful APIs
- JWT Authentication
- bcryptjs
- dotenv
- CORS
- Nodemon

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Development and Testing

- Visual Studio Code
- npm
- Git
- GitHub
- Thunder Client

### Deployment

- Render - Backend Deployment
- Vercel  - Frontend Deployment
- MongoDB Atlas - Cloud Database

    ## Architecture

┌────────────────────────────────────┐
│          React Frontend            │
│                                    │
│   Vite + JavaScript + Bootstrap    │
│          Axios + CSS               │
└──────────────────┬─────────────────┘
                   │
                   │ REST API Requests
                   │
                   ▼
┌────────────────────────────────────┐
│          Node.js Backend           │
│                                    │
│           Express.js               │
│                                    │
│  Authentication Middleware         │
│  Authorization Middleware          │
│  Controllers                       │
│  REST API Routes                   │
└──────────────────┬─────────────────┘
                   │
                   │ Mongoose ODM
                   ▼
┌────────────────────────────────────┐
│          MongoDB Atlas             │
│                                    │
│  Users                             │
│  Bases                             │
│  Equipment                         │
│  Opening Balances                  │
│  Purchases                         │
│  Transfers                         │
│  Assignments                       │
│  Expenditures                      │
│  Audit Logs                        │
└────────────────────────────────────┘

   ## Features

- User Registration and Login
- JWT-based Authentication
- Password Hashing using bcryptjs
- Role-Based Access Control (RBAC)
- Admin Role
- Base Commander Role
- Logistics Officer Role
- Base Management
- Equipment Management
- Opening Balance Management
- Purchase Management
- Transfer Management
- Assignment Management
- Expenditure Management
- Dashboard API
- Asset Balance Calculation
- Audit Logging
- Search
- Pagination
- Sorting
- Protected Routes
- Base-level Access Restrictions

---

## User Roles

### Admin

- Full access to the system.
- Manage users, bases, and equipment.
- Manage asset transactions.
- View dashboard information.

### Base Commander

- Access assets related to the assigned base.
- Manage permitted operations for the assigned base.
- View base-specific asset information.

### Logistics Officer

- Manage logistics-related operations.
- Manage purchases and transfers.
- View relevant asset movement records.

## API Endpoints

### Authentication

POST /api/users
POST /api/users/login
GET  /api/users

### Base

 GET /api/bases
 POST /api/bases

### Equipment

GET  /api/equipment
POST /api/equipment

### Opening Balances
GET  /api/opening-balances
POST /api/opening-balances

### Purchases
GET  /api/purchases
POST /api/purchases

### Transfers
GET  /api/transfers
POST /api/transfers

### Assignments
GET  /api/assignments
POST /api/assignments

### Expenditures
GET  /api/expenditures
POST /api/expenditures

### Dashboard
GET /api/dashboard

### Asset Balance Calculation

The system calculates asset movement using:

==> Net Movement = Purchases + Transfer In - Transfer Out

The closing balance is calculated as:

==> Closing Balance =Opening Balance+ Net Movement- Assigned Assets- Expended Assets

### Security
JWT Authentication
Password Hashing using bcryptjs
Protected Routes
Role-Based Authorization
Base-level Access Restrictions
Input Validation
CORS Configuration
Environment Variable Protection

### Audit Logging

The system records audit logs for important asset transactions, including:

Opening Balance Creation
Purchase Creation
Transfer Creation
Assignment Creation
Expenditure Creation

** Each audit log records:

User who performed the action
Action type
Entity
Entity ID
Transaction details
Timestamp

### API Testing

The backend REST APIs were tested using Thunder Client.

The following features were tested:

User Registration
User Login
JWT Authentication
Protected Routes
Role-Based Authorization
Base Management
Equipment Management
Opening Balance Creation
Purchase Creation
Transfer Creation
Assignment Creation
Expenditure Creation
Dashboard Data Retrieval
Search
Pagination
Sorting
Invalid Credentials
Missing Authentication Token
Unauthorized Role Access
Invalid Input Validation

## Author

**Keerthi Kothakalva
