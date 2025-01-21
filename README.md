# TIKO ticket booking system

Welcome to the TIKO Ticketing System repository! This platform is designed to provide users with an efficient and user-friendly way to browse, book, and manage event tickets in real time.

---

## Features

- **Event Management**: Create, update, and delete events seamlessly.
- **User Registration and Authentication**: Secure login and registration for all users.
- **Ticket Booking**: Real-time ticket booking and management functionality.
- **Admin Panel**: Dedicated panel for managing events and viewing ticket sales.
- **Responsive UI**: Optimized design for multiple devices.

---

## Technologies Used

### Backend

- **Spring Boot**: Robust and scalable backend framework.
- **RESTful APIs**: Enables seamless communication between the frontend and backend.
- **MySQL**: Manages users, events, and tickets.
- **Spring Security**: Ensures secure user authentication and authorization.

### Frontend

- **Angular**: Creates a responsive and dynamic single-page application.
- **Bootstrap**: Provides styling and responsive design.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Java** (v11 or higher)
- **Node.js** (v14 or higher)
- **Angular CLI** (v12 or higher)
- **MySQL**

### Setup

#### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies and build the project:
   ```bash
   mvn clean install
   ```
3. Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

#### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend-tiko
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
4. Access the application at [http://localhost:4200/](http://localhost:4200/).

#### Database Configuration

1. Update the `application.properties` file in the backend folder with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/tiko
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
2. Run the following SQL script to set up the database schema:
   ```sql
   CREATE DATABASE tiko;
   ```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy using the TIKO! 🎟

![{3ED2BC46-0F9E-410F-A40D-86BCB3A1F7AC}](https://github.com/user-attachments/assets/f0cfbdf4-a774-4e9a-b58c-0cc813cdc4d9)



