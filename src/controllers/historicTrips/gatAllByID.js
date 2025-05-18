import db from '../../../db.js';
import { getCityImages } from '../../middlewares/getCityImage.js';

export async function getAllByID(req, res, next) {
    try {
        const historicTrips = await db('historic_trips').select('*').where({ 'user_id': req.userID });
        const updatedTrips = await Promise.all(
            historicTrips.map(async (trip) => {
                const images = await getCityImages(trip.city);
                return { ...trip, images };
            })
        );
        res.status(200).json(updatedTrips);
    } catch (error) {
        next(error);
    }
}
