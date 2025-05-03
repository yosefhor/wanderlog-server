import { checkPassword, deleteRefrehToken, validateAccessToken } from "../../middlewares/auth.js";
import { development } from '../../../knexfile.js';
import knex from 'knex';

const db = knex(development);

export async function deleteAccount(user, accessToken, res) {
    let { username, password } = user;
    if (!username) {
        const userID = validateAccessToken(accessToken, res).userID;
        username = (await db('users').select('username').where({ id: userID }))[0].username;
    }
    try {
        const userID = await checkPassword({ username: username, password: password });
        await db('users').where('id', userID).del();
        await deleteRefrehToken(userID);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken', { path: '/auth/refreshtoken' });
        return 'the account has been deleted';
    } catch (error) {
        throw error;
    }
}