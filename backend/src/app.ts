import express from 'express';

const app = express();

// Middlewares
app.use(express.json()); // For JSON parsing

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the Express + TypeScript server!');
});

export default app;
