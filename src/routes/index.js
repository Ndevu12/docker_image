const express = require('express');
const router = express.Router();

// Import route modules
const systemRoutes = require('./system');
const userRoutes = require('./users');
const todoRoutes = require('./todos');
// Home route
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Docker Learning Server!',
        version: '1.0.0',        endpoints: {
            health: '/health',
            system: '/api/system',
            users: '/api/users',
            todos: '/api/todos'
        }
    });
});

// Mount route modules
router.use('/', systemRoutes);           // /health, /system
router.use('/api', systemRoutes);       // /api/system (alternative)
router.use('/api/users', userRoutes);   // /api/users/*
router.use('/api/todos', todoRoutes);   // /api/todos/*

// API info endpoint
router.get('/api', (req, res) => {
    res.json({
        message: 'Docker Learning Server API',
        version: '1.0.0',
        endpoints: {
            system: {
                health: 'GET /health',
                info: 'GET /api/system'
            },
            users: {
                list: 'GET /api/users',
                get: 'GET /api/users/:id',
                create: 'POST /api/users',
                update: 'PUT /api/users/:id',
                delete: 'DELETE /api/users/:id'
            },
            todos: {
                list: 'GET /api/todos',
                get: 'GET /api/todos/:id',
                create: 'POST /api/todos',
                update: 'PUT /api/todos/:id',
                delete: 'DELETE /api/todos/:id'
            }
        }
    });
});

module.exports = router;
