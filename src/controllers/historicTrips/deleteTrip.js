import db from '../../../db.js';

export async function deleteTrip(req, res, next) {
    try {
        await db('historic_trips').delete('*').where({ 'id': req.body.tripId, 'user_id': req.userID });
        res.status(200).json('deleted successfully');
    } catch (error) {
        next(error);
    }
}
