const express = require('express');
const path = require('path');

// Simple error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
};

// Simple 404 handler
const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method
    });
};

// Simple request logging middleware
const requestLogger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
};

// Apply basic middleware to app
const applyMiddleware = (app) => {
    // Basic request logging
    app.use(requestLogger);
    
    // Body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Static files middleware
    app.use(express.static(path.join(__dirname, '../../public')));
    
    return app;
};

module.exports = {
    errorHandler,
    notFoundHandler,
    requestLogger,
    applyMiddleware
};
