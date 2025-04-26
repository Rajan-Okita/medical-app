# 🏥 Health System

A simple health management system built with **Next.js 14**, **Prisma ORM**, and **PostgreSQL**. This application allows a doctor to:

- Sign up and log in securely.
- Manage clients (add, edit, delete, view).
- Manage health programs (add, edit, delete, assign to clients).
- Search and paginate through clients and programs.

Styled using **TailwindCSS 4** for a clean and responsive UI.

---

## 🚀 Features

- 👨‍⚕️ Doctor Authentication (Sign Up & Login)
- 👥 Client Management
- 📋 Program Management
- 🔎 Search & Pagination for Clients and Programs
- ⚡ Modern UI with TailwindCSS
- 🗄️ PostgreSQL database with Prisma ORM
- API Routes for backend logic

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Styling:** TailwindCSS 4
- **Authentication:** Basic (custom API with hashed passwords)
- **Deployment:** Runs locally

---

## ⚙️ Setup Instructions

### 1️ Clone the Repository
```bash
git clone https://github.com/Rajan-Okita/medical-app.git
cd medical-app
```
### 2 Install Dependencies
```bash 
npm install 
```

### 3 Configure Environment Variables
- Create a .env file in the root directory and ensure the PostgreSQL matches the one in the prisma.

### 4 Set up Prisma 
```bash
npx prisma generate
npx prisma migrate dev --name init
```
### 4 Run the Development Server 
```bash 
npm run dev 
```
## 📡 Example API Requests

### 🔐 1. Doctor Signup
```http
POST /api/auth/signup
Content-Type: application/json
{
    "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```
### 🔐 2. Doctor Login
```http
POST /api/auth/login
Content-Type: application/json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```
### 👥 3. Add a New Client
```http
POST /api/client
Content-Type: application/json

{
  "first_name": "Jane",
  "last_name": "Smith",
  "weight": 70,
  "age": 30,
  "program_ids": [1, 2]   // IDs of programs to enroll
}
```

### 👥 4. Get All Clients
```http
GET /api/client
```
### 👥 5. Get Single Client by ID
```http
GET /api/client/{client_id}
```
## ✨ Usage
- Navigate to / and choose Sign Up to create a doctor account.
- Login via /auth/login.
- Access the dashboard to manage clients and programs.
- Use search and pagination to easily navigate large datasets.