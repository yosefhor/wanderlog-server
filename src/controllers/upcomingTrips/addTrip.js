import db from '../../../db.js';
import { getCityImages } from '../../middlewares/getCityImage.js';

export async function addTrip(req, res, next) {
    try {
        const addedTrip = await db('upcoming_trips').insert({
            'city': req.body.city,
            'country': req.body.country,
            'hotel': req.body.hotel,
            'month': req.body.month,
            'year': req.body.year,
            'user_id': req.userID,
        })
            .returning('*');
        const images = await getCityImages(addedTrip.city);
        const addedTripWithImages = { ...addedTrip[0], images };
        res.status(200).json({ addedTripWithImages: addedTripWithImages, message: 'added successfully' });
    } catch (error) {
        next(error);
    }
}
