const express = require('express');
const router = express.Router();

// Simple ID counter for generating todo IDs
let todoIdCounter = 3;

// In-memory data store (for demonstration)
let todos = [
    { id: '1', title: 'Learn Docker', completed: false, userId: '1', createdAt: new Date().toISOString() },
    { id: '2', title: 'Build Node.js app', completed: true, userId: '1', createdAt: new Date().toISOString() }
];

// Get all todos with filtering
router.get('/', (req, res) => {
    const { completed, userId } = req.query;
    let filteredTodos = todos;
    
    if (completed !== undefined) {
        filteredTodos = filteredTodos.filter(t => t.completed === (completed === 'true'));
    }
    
    if (userId) {
        filteredTodos = filteredTodos.filter(t => t.userId === userId);
    }
    
    res.json({ todos: filteredTodos, count: filteredTodos.length });
});

// Get todo by ID
router.get('/:id', (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
});

// Create new todo
router.post('/', (req, res) => {
    const { title, userId } = req.body;
    
    if (!title || !userId) {
        return res.status(400).json({ error: 'Title and userId are required' });
    }
    
    // Verify user exists
    const { getUserById } = require('./users');
    const user = getUserById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
      const newTodo = {
        id: todoIdCounter.toString(),
        title,
        completed: false,
        userId,
        createdAt: new Date().toISOString()
    };
    
    todoIdCounter++;
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update todo
router.put('/:id', (req, res) => {
    const { title, completed } = req.body;
    const todoIndex = todos.findIndex(t => t.id === req.params.id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos[todoIndex] = {
        ...todos[todoIndex],
        title: title !== undefined ? title : todos[todoIndex].title,
        completed: completed !== undefined ? completed : todos[todoIndex].completed,
        updatedAt: new Date().toISOString()
    };
    
    res.json(todos[todoIndex]);
});

// Delete todo
router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === req.params.id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos.splice(todoIndex, 1);
    res.status(204).send();
});

// Helper functions for other modules
const getTodosByUserId = (userId) => todos.filter(t => t.userId === userId);
const deleteTodosByUserId = (userId) => {
    todos = todos.filter(t => t.userId !== userId);
};
const getAllTodos = () => todos;

module.exports = router;
module.exports.getTodosByUserId = getTodosByUserId;
module.exports.deleteTodosByUserId = deleteTodosByUserId;
module.exports.getAllTodos = getAllTodos;
