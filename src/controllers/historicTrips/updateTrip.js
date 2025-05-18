import db from '../../../db.js';
import { getCityImages } from '../../middlewares/getCityImage.js';

export async function updateTrip(req, res, next) {
    try {
        const updatedTrip = await db('historic_trips').update({
            'city': req.body.city,
            'country': req.body.country,
            'description': req.body.description,
            'score': req.body.score,
            'hotel': req.body.hotel,
            'month': req.body.month,
            'year': req.body.year,
        }).where({ 'id': req.body.id, 'user_id': req.userID })
            .returning('*');
        const images = await getCityImages(updatedTrip.city);
        const updatedTripWithImages = { ...updatedTrip[0], images };
        res.status(200).json({ updatedTripWithImages: updatedTripWithImages, message: 'updated successfully' });
    } catch (error) {
        next(error);
    }
}
