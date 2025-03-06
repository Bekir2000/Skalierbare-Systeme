# Todo Application

A simple and intuitive Todo application that helps you stay organized and collaborate with others. Built with modern web technologies like Node.js, Express, SQLite, and Vue.js, this app makes task management a breeze. Create, edit, delete and track your todos with just a few clicks! Perfect for both individual users and teams, the application supports multiple user accounts with secure data isolation.

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```shell
git clone https://github.com/yourusername/todo-application.git
cd todo-application/
```

2. Install the required dependencies:
```shell
npm install
```

This will install all necessary packages including:
- Express.js (Web framework)
- SQLite3 (Database)
- bcrypt (Password hashing)
- Other required dependencies

## Database Setup

The application uses SQLite as its database. The database will be automatically initialized when you start the server for the first time. The database file (todos.db) will be created in the root directory.

## Starting the Application

1. Start the server:
```shell
node server.js
```

2. Once the server is running, you can access the application at:
```
http://localhost:3000
```

## Features

- User Registration and Authentication
- Create, Read, Update, and Delete Todos
- Set deadlines for tasks
- Track task completion percentage
- Secure password handling
- User-specific todo lists

## Usage

1. Register a new account or login with existing credentials
2. Create new todos with descriptions, deadlines, and completion percentages
3. Edit existing todos to update their status
4. Delete completed or unnecessary todos
5. Track your progress through the intuitive interface

## Security

- Passwords are securely hashed using bcrypt
- User sessions are managed securely
- SQL injection prevention through parameterized queries

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
