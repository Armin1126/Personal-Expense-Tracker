# Personal Expense Tracker

A full-stack web application for tracking personal expenses with user authentication and visualization.

## Features

- User registration and login
- Add, edit, and delete expenses
- Dashboard with expense overview
- Interactive charts for expense analysis
- Responsive design

## Tech Stack

- **Backend:** Spring Boot (Java 17), MongoDB
- **Frontend:** React.js, Axios, Chart.js, React Router

## Prerequisites

- Java 17 or higher
- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd personal-expense-tracker
   ```
2. **Set up MongoDB:**
   - Install MongoDB if not already installed
   - Start MongoDB service (default port 27017)
   - Ensure MongoDB is running before starting the backend
   - Ensure to change application.properties to your MongoDB url
   - spring.data.mongodb.uri=mongodb://127.0.0.1:27017/test
     spring.data.mongodb.database=<database-name>

2. **Set up MongoDB:**
   - Install MongoDB if not already installed
   - Start MongoDB service (default port 27017)
   - Ensure MongoDB is running before starting the backend
   - Ensure to change application.properties to your MongoDB url
   - spring.data.mongodb.uri=mongodb://127.0.0.1:27017/test
     spring.data.mongodb.database=<database-name>

3. **Backend Setup:**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

4. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will start on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account or login with existing credentials
3. Add your expenses using the "Add Expense" feature
4. View and manage your expenses on the dashboard
5. Analyze your spending patterns with the built-in charts

## API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/expenses` - Get all expenses for logged-in user
- `POST /api/expenses` - Add new expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


Project Photos:
1. Login Page
   
   <img width="1789" height="916" alt="image" src="https://github.com/user-attachments/assets/620d32f6-5137-403c-bffa-fd74600cf688" />

2. MongoDB for User Login

   <img width="1919" height="1076" alt="image" src="https://github.com/user-attachments/assets/5755dfe2-507a-49e0-b76b-bd61cfe54c83" />

3. MongoDB for Expense Tracking

    <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/376c01ff-7d95-4a80-acd2-ab120dddc457" />


4. Expense Tracker Dashboard
   
   <img width="1352" height="932" alt="image" src="https://github.com/user-attachments/assets/c3acc942-d902-4d8f-8644-7b73e0cb4df9" />


5. Adding Expense

    <img width="726" height="608" alt="image" src="https://github.com/user-attachments/assets/1ada9b80-d4d6-43fd-96e5-5c5f623ea8dd" />


6. Updated Expense Tracker

   <img width="1336" height="936" alt="image" src="https://github.com/user-attachments/assets/85f7cb67-2f38-4f10-bdd7-260241dfd7be" />

