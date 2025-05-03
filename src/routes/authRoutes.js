import express from 'express';
import { register } from '../controllers/auth/register.js';
import { login } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';
import { deleteAccount } from '../controllers/auth/deleteaccount.js';
import { changePassword } from '../controllers/auth/changepassword.js';
import { renewAccessToken } from '../controllers/auth/renewAccessToken.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const response = await login(req.body, res);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const response = await register(req.body);
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
})

router.post('/refreshtoken', async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        const response = await renewAccessToken(refreshToken, res);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
})

router.post('/logout', async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    try {
        const response = await logout(accessToken, res);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
})

router.put('/change-password', async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    try {
        const response = await changePassword(req.body, accessToken, res);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
})

router.delete('/delete-account', async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    try {
        const response = await deleteAccount(req.body, accessToken, res);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
})

export default router;