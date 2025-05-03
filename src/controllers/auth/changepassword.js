import { checkPassword, validateAccessToken } from "../../middlewares/auth.js";
import { development } from '../../../knexfile.js';
import knex from 'knex';
import bcrypt from 'bcryptjs';

const db = knex(development);

export async function changePassword(user, accessToken, res) {
    let { username, oldPassword, newPassword } = user;
    try {
        let userID;
        if (!username) {
            userID = validateAccessToken(accessToken, res).userID;
        }
        userID = await checkPassword({ username: username, password: oldPassword, userID: userID });
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await db('users').update({ 'password': encryptedPassword }).where('id', userID);
        return 'the password has been changed';
    } catch (error) {
        throw error;
    }
}