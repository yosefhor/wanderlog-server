import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import historicPlacesRoutes from './routes/historicPlacesRoutes.js';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.SERVER_PORT || 5000;

app.use('/auth', authRoutes);
app.use('/api/historic-places', historicPlacesRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        statusText: err.message || 'Internal Server Error',
    });
});

app.listen(port, () => {
    console.log(`the app is listening on port: ${port}`);
})