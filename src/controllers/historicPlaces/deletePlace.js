import knex from 'knex';
import { development } from '../../../knexfile.js';

const db = knex(development);

export async function deletePlace(req, res, next) {
    try {
        await db('historic_places').delete('*').where({ 'id': req.body.placeId, 'user_id': req.userID });
        res.status(200).json('deleted successfully');
    } catch (error) {
        next(error);
    }
}
