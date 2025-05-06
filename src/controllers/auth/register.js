import bcrypt from 'bcryptjs';
import { checkUser } from '../../middlewares/checkUser.js';
import db from '../../../db.js';

function createError(message, status) {
    const error = new Error(message);
    error.status = status;
    return error;
}

export async function register({ username, password }) {
    try {
        const userExist = await checkUser({ username: username });
        if (userExist) {
            throw createError("The username you have chosen is already taken. Please choose a different one.", 400);
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10);
            await db('users').insert({
                username: username,
                password: encryptedPassword,
            });
            return 'rgister successful';
        }
    } catch (error) {
        throw error;
    }
}
