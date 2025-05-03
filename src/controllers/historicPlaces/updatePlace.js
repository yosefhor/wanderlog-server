import knex from 'knex';
import { development } from '../../../knexfile.js';
import { getCityImages } from '../../middlewares/getCityImage.js';

const db = knex(development);

export async function updatePlace(req, res, next) {
    try {
        const updatedPlace = await db('historic_places').update({
            'city': req.body.city,
            'country': req.body.country,
            'description': req.body.description,
            'score': req.body.score,
            'hotel': req.body.hotel,
            'month': req.body.month,
            'year': req.body.year,
        }).where({ 'id': req.body.id, 'user_id': req.userID })
            .returning('*');
        const images = await getCityImages(updatedPlace.city);
        const updatedPlaceWithImages = { ...updatedPlace[0], images };
        res.status(200).json({ updatedPlaceWithImages: updatedPlaceWithImages, message: 'updated successfully' });
    } catch (error) {
        next(error);
    }
}
