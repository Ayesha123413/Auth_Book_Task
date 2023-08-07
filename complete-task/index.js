const express = require('express');
const morgan = require('morgan');
const BookRoutes = require('./src/routes/Book.routes')
const AuthRoutes = require('./src/routes/Auth.routes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');


const app = express();
const port = process.env.PORT || 4000;


// Middleware for JSON parsing
app.use(express.json());

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Middleware for CORS (if your UI is hosted on a different domain)
// Replace '*' with the actual domain of your UI to restrict access.

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


//route for books 

app.use('/book', BookRoutes)

// route for Auth

app.use('/auth', AuthRoutes)

// Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Global error middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err.name === 'ValidationError') {
        return res.status(422).json({ errors: err.array() });
    }
    return res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});