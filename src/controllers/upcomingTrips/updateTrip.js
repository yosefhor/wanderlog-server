import db from '../../../db.js';
import { getCityImages } from '../../middlewares/getCityImage.js';

export async function updateTrip(req, res, next) {
    try {
        const updatedTrips = await db('upcoming_trips').update({
            'city': req.body.city,
            'country': req.body.country,
            'hotel': req.body.hotel,
            'month': req.body.month,
            'year': req.body.year,
        }).where({ 'id': req.body.id, 'user_id': req.userID })
            .returning('*');
        const images = await getCityImages(updatedTrips.city);
        const updatedTripsWithImages = { ...updatedTrips[0], images };
        res.status(200).json({ updatedTripsWithImages: updatedTripsWithImages, message: 'updated successfully' });
    } catch (error) {
        next(error);
    }
}
