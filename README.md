# Courses API using Node.js with CRUD, Authentication, Authorization, and Token


## Overview

This Node.js API project serves as a robust backend for managing courses, integrating CRUD operations, user authentication, authorization, and token-based security. MongoDB is employed for storing course data, with additional routes for user registration, login, and profile retrieval.

## Features

1. **CRUD Operations:**
   - **Create:** Add new courses to the database.
   - **Read:** Retrieve information about all courses or a specific course by ID.
   - **Update:** Modify existing course details.
   - **Delete:** Remove a course from the database.

2. **User Authentication and Authorization:**
   - Secure API endpoints using user authentication to ensure only authorized users can perform CRUD operations.
   - Implement role-based access control for enhanced security.

3. **Token-Based Security:**
   - Utilize JSON Web Tokens (JWT) for secure user authentication and authorization.
   - Generate and validate tokens to protect sensitive API endpoints.

4. **User Management:**
   - **Register:** Allow users to register by providing necessary information.
   - **Login:** Authenticate users and provide tokens for subsequent requests.
   - **Profile:** Retrieve user profile information based on the provided token.
   - **Get Users:** Retrieve a list of all users (admin access required).

5. **MongoDB Integration:**
   - Connect to a MongoDB database to store and retrieve course and user data.
   - Leverage MongoDB for efficient handling of CRUD operations.
    
6. **FILE UPLOADS:**
   - Allow users to upload files (e.g., images, documents) associated with courses.

## Getting Started

1. **Installation:**
   ```bash
   npm install
   ```

2. **Configuration:**
   - Set up MongoDB connection string in the configuration file.
   - Configure authentication and authorization parameters.

3. **Run the Application:**
   ```bash
   node index.js
   ```

## API Endpoints

- **Courses:**
  - **GET http://localhost:5000/courses:** Retrieve a list of all courses.
  - **GET http://localhost:5000/courses/:id:** Retrieve details of a specific course by ID.
  - **POST http://localhost:5000/courses:** Add a new course to the database.
  - **PUT http://localhost:5000/courses/:id:** Update details of a specific course.
  - **DELETE http://localhost:5000/courses/:id:** Delete a course from the database.

- **Users:**
  - **POST http://localhost:5000/users/register:** Register a new user.
  - **POST http://localhost:5000/users/login:** User authentication endpoint to obtain a token.
  - **GET http://localhost:5000/users/:** Retrieve a list of all users (admin access required).

## Security

1. **Token Generation:**
   - Ensure tokens are securely generated upon successful user authentication.

2. **Authorization Middleware:**
   - Implement middleware to check user roles and permissions before allowing access to protected endpoints.

3. **Secure MongoDB Connection:**
   - Configure MongoDB with secure connection parameters.

## Contributors

- MOHAMED ELSAYED AHMED

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute and enhance the functionality as needed for your specific use case.
