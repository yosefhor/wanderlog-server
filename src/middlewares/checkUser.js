import db from '../../db.js';

export async function checkUser({ username, userID }) {
    const searchColumn = username ? 'username' : 'id';
    const parameterToSearch = username ? username : userID;
    try {
        const user = await db('users')
            .select('*')
            .where(searchColumn, parameterToSearch)
            .first();
        return user || false;
    } catch (error) {
        throw error;
    }
};