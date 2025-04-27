# Lightweight Todo App

A simple Todo application built with React (Vite) and FastAPI.

## Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL

## Backend Setup

1. Create a MySQL database:
```sql
CREATE DATABASE todo_db;
```

2. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Update the database connection URL in `backend/main.py` if needed:
```python
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://your_username:your_password@localhost/todo_db"
```

4. Run the backend server:
```bash
uvicorn main:app --reload
```

## Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000 