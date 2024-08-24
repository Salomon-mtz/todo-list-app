# Todo List Application

## Overview

Welcome to the **Todo List Application**! This web application allows users to manage their tasks efficiently by creating, updating, and deleting tasks, subtasks, and comments. It features user authentication to ensure that each user's data is secure and personalized.

**Live Demo:** [https://todo-list-app-neon-xi.vercel.app/](https://todo-list-app-neon-xi.vercel.app/)

## Features

- **User Authentication**: Register and log in securely using JWT-based authentication.
- **Task Management**: Create, read, update, and delete tasks.
- **Subtasks**: Add, edit, delete, and toggle the completion status of subtasks within tasks.
- **Comments**: Add, edit, and delete comments on tasks.
- **Responsive Design**: Built with Material-UI to ensure a responsive and user-friendly interface.

## Technologies Used

- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **Next.js**: A React framework for server-side rendering and generating static websites.
  - **Material-UI**: A popular React UI framework for designing responsive interfaces.

- **Backend**:
  - **Node.js**: A JavaScript runtime for building scalable network applications.
  - **Express.js**: A minimal and flexible Node.js web application framework.

- **Database**:
  - **MongoDB**: A NoSQL database for storing application data.

- **Authentication**:
  - **JWT (JSON Web Tokens)**: For secure user authentication and authorization.

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js (v14 or higher) installed on your machine.
- **MongoDB**: You can use MongoDB Atlas (a cloud database) or set up a local MongoDB instance.

### Local Development

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/todo-app.git
    cd todo-list-app
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Environment Variables (optional)**

    Create a `.env` file in the root directory of the project and add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

    - **MONGO_URI**: Replace `your_mongodb_connection_string` with your actual MongoDB connection string.
    - **JWT_SECRET**: Replace `your_jwt_secret` with a strong secret key for JWT.

4. **Run the Backend Server**

    Start the Express.js backend server using the following command:

    ```bash
    npm run server
    ```

    - The backend server will start on `http://localhost:5001`.

5. **Run the Frontend Development Server**

    Start the Next.js frontend development server using the following command:

    ```bash
    npm run dev
    ```

    - The frontend server will start on `http://localhost:3000`.

6. **Access the Application**

    Open your browser and navigate to `http://localhost:3000` to access the Todo List application.

## Usage

### Test Credentials

You can log in to the application using the following credentials:

- **Email**: mtzelisalomon@gmail.com
- **Password**: salo123

- **Register**: Create a new account by registering with your email and password.
- **Login**: Access your account by logging in with your credentials.
- **Manage Tasks**:
  - **Add Task**: Create new tasks to keep track of your to-dos.
  - **Edit Task**: Modify existing tasks as needed.
  - **Delete Task**: Remove tasks that are no longer relevant.
- **Manage Subtasks**:
  - **Add Subtask**: Break down tasks into smaller, manageable subtasks.
  - **Edit Subtask**: Update the details of existing subtasks.
  - **Delete Subtask**: Remove subtasks that are completed or no longer needed.
  - **Toggle Subtask Status**: Mark subtasks as completed or pending.
- **Manage Comments**:
  - **Add Comment**: Provide additional context or notes on tasks.
  - **Edit Comment**: Update existing comments for clarity.
  - **Delete Comment**: Remove comments that are outdated or irrelevant.
