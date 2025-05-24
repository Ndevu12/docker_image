const express = require('express');
const router = express.Router();

// Simple ID counter for generating user IDs
let userIdCounter = 3;

// In-memory data store (for demonstration)
let users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() }
];

// Get all users with pagination
router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    res.json({
        users: paginatedUsers,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: users.length,
            totalPages: Math.ceil(users.length / limit)
        }
    });
});

// Get user by ID with their todos
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Import todos data (this would be a database query in real app)
    const { getTodosByUserId } = require('./todos');
    const userTodos = getTodosByUserId(user.id);
    
    res.json({ ...user, todos: userTodos });
});

// Create new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
    }
      const newUser = {
        id: userIdCounter.toString(),
        name,
        email,
        createdAt: new Date().toISOString()
    };
    
    userIdCounter++;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update user
router.put('/:id', (req, res) => {
    const { name, email } = req.body;
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    if (email) {
        const existingUser = users.find(u => u.email === email && u.id !== req.params.id);
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }
    }
    
    users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        updatedAt: new Date().toISOString()
    };
    
    res.json(users[userIndex]);
});

// Delete user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Also delete user's todos
    const { deleteTodosByUserId } = require('./todos');
    deleteTodosByUserId(req.params.id);
    
    users.splice(userIndex, 1);
    res.status(204).send();
});

// Helper functions for other modules
const getUserById = (id) => users.find(u => u.id === id);
const getAllUsers = () => users;

module.exports = router;
module.exports.getUserById = getUserById;
module.exports.getAllUsers = getAllUsers;
