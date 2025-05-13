import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import historicPlacesRoutes from './routes/historicPlacesRoutes.js';
import db from '../db.js';

const app = express();
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://wanderlog-client.onrender.com',
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.SERVER_PORT || 5000;

// to keep Render.com server alive
app.get("/api/ping", (req, res) => {
    res.status(200).send("pong");
});

app.use('/auth', authRoutes);
app.use('/api/historic-places', historicPlacesRoutes);

app.use((err, req, res, next) => {
    console.log('Status:', err.status, 'Error:', err.message);
    res.status(err.status || 500).json({
        statusText: err.message || 'Internal Server Error',
    });
});

app.listen(port, () => {
    console.log(`the app is listening on port: ${port}`);
})