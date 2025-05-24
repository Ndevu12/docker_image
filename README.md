# 🐳 Docker Learning Server

A simple Node.js application designed for learning Docker containerization concepts. This project includes a basic Express.js server with essential endpoints to demonstrate Docker fundamentals.

## 📋 Features

- **Simple Express.js server** with basic routes
- **Health check endpoint** for container monitoring
- **RESTful API** with in-memory data storage
- **Docker configuration** for containerization learning
- **Docker Compose** for easy container management
- **Basic error handling** and logging

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system
- [Node.js](https://nodejs.org/) (for local development - optional)

### Running with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t docker-learning-server .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 docker-learning-server
   ```

3. **Access the application:**
   Open your browser and visit `http://localhost:3000`

### Running with Docker Compose

1. **Start the application:**
   ```bash
   docker-compose up -d
   ```

2. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Local Development (Optional)

If you want to run without Docker for development:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

- `GET /` - Welcome message and API overview
- `GET /health` - Health check endpoint
- `GET /api/system` - System information
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo

## 🐳 Docker Learning Concepts

This project demonstrates:

1. **Dockerfile** - How to containerize a Node.js application
2. **Docker Compose** - How to manage container lifecycle
3. **Port mapping** - Exposing container ports to host
4. **Volume mounting** - For development with live reload
5. **Environment variables** - Configuration management
6. **Health checks** - Container monitoring

## 🛠️ Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start with nodemon for development
- `npm test` - Run tests
- `docker:build` - Build Docker image
- `docker:run` - Run Docker container
- `compose:up` - Start with Docker Compose
- `compose:down` - Stop Docker Compose services

## 📁 Project Structure

```
├── src/
│   ├── app.js              # Main application file
│   ├── middleware/         # Express middleware
│   └── routes/            # API routes
├── config/
│   └── app.json           # Application configuration
├── public/
│   └── index.html         # Static web interface
├── Dockerfile             # Docker image configuration
├── docker-compose.yml     # Multi-container setup
└── package.json           # Node.js dependencies
```

## 🤝 Learning Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Express.js Documentation](https://expressjs.com/)

## 🛠 Docker Commands Cheat Sheet

### Basic Commands
```bash
# Build image
docker build -t docker-learning-server .

# Run container
docker run -p 3000:3000 docker-learning-server

# Run container in background
docker run -d -p 3000:3000 --name my-learning-server docker-learning-server

# View running containers
docker ps

# Stop container
docker stop my-learning-server

# Remove container
docker rm my-learning-server
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build
```

## 📝 License

MIT License - feel free to use this project for learning!
