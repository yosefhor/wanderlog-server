import bcrypt from 'bcryptjs';
import env from "dotenv";
import jwt from "jsonwebtoken";
import { checkUser } from "../middlewares/checkUser.js";
import db from '../../db.js';

env.config();
const secret_key = process.env.SECRET_KEY;

function createError(message, status) {
    const error = new Error(message);
    error.status = status;
    return error;
}

export async function checkPassword({ username, password, userID }) {
    try {
        const user = await checkUser({ username: username, userID: userID });
        if (!user) {
            throw createError("The username or password is incorrect", 401)
        };
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return user.id;
        } else {
            throw createError("The username or password is incorrect", 401);
        }
    } catch (error) {
        throw error;
    }
};

export function generateAccessToken(res, userID, username) {
    try {
        const accessToken = jwt.sign({ userID, username }, secret_key, { expiresIn: '1h' });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60,
        })
        return true;
    } catch (error) {
        throw createError("Internal Server Error", 500);
    }
};

export async function generateRefreshToken(res, userID, username) {
    try {
        await deleteRefrehToken(userID)
        const refreshToken = jwt.sign({ userID, username }, secret_key, { expiresIn: '7d' });
        await db('refresh_tokens').insert({ token: refreshToken, user_id: userID, expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
        res.cookie('refreshToken', refreshToken, {
            path: '/auth/refreshtoken',
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        return true;
    } catch (error) {
        throw createError("Internal Server Error", 500);
    }
};

export function validateAccessToken(accessToken) {
    if (!accessToken) {
        throw createError("AccessTokenMissing", 401);
    }
    try {
        return jwt.verify(accessToken, secret_key);
    } catch (error) {
        throw createError(401, "Authentication failed, try login again");
    }
}


export function validateRefrehToken(refrehToken, res) {
    try {
        return jwt.verify(refrehToken, secret_key);
    } catch (error) {
        if (res) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken', { path: '/auth/refreshtoken' });
        }
        throw createError("Authentication failed, try login again", 401);
    }
};

export async function deleteRefrehToken(userID) {
    try {
        await db('refresh_tokens').where('user_id', userID).del();
        return true;
    } catch (error) {
        throw createError("Authentication failed, try login again", 500);
    }
};