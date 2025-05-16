---

# MERN Stack Agent Management & Task Distribution App

## Project Overview

A MERN stack app allowing admin login, agent management, CSV upload, and equal task distribution among agents. Uses JWT for authentication and MongoDB for data storage.

---

## Features

* Admin login with JWT authentication
* Add/edit/delete agents
* Upload and validate CSV/XLSX files with task lists
* Distribute tasks equally among 5 agents
* Save and display distributed tasks from MongoDB

---

## Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js + Express.js
* **Database:** MongoDB
* **Auth:** JWT
* **CSV Parsing:** Papaparse

---

## Prerequisites

* Node.js (v14+)
* npm or yarn
* MongoDB (local or Atlas)

---

## Installation & Running

### Backend

1. Navigate to backend folder:
   `cd backend`
2. Install dependencies:
   `npm install bcryptjs , cors, dotenv, express, jsonwebtoken, mongoose`
3. Create `.env` file with variables:

   ```
   MONGO_URI=mongodb+srv://rojakshsharma987:EQaFOfRj1Hk1mqD8@dashboard.zjijvlx.mongodb.net/?retryWrites=true&w=majority&appName=dashboard
   JWT_SECRET=loginuser
   PORT=5000
   ```
4. Start backend server:
   `npm run dev` (requires nodemon) or `node index.js`

### Frontend

1. Navigate to frontend folder:
   `cd frontend`
2. Install dependencies:
   `npm install react-hot-toast , react-router-dom ,papaparse`
3. Start frontend server:
   `npm run dev`

---

## Usage

* Access the app at `http://localhost:5000`
* First create account or signup and then Login as admin
* Add agents with required details
* Upload CSV/XLSX file with task list (columns: FirstName, Phone, Notes)
* Tasks get distributed evenly to agents and saved
* View distributed tasks per agent on dashboard

---

## Notes

* Supported file types for upload: `.csv`, `.xlsx`, `.xls`
* Proper validation and error handling implemented
* Make sure MongoDB is running before starting backend
* JWT tokens are stored in local storage for authentication

---


