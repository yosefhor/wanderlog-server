import knex from 'knex';
import { development } from '../../../knexfile.js';
import { getCityImages } from '../../middlewares/getCityImage.js';

const db = knex(development);

export async function addPlace(req, res, next) {
    try {
        const addedPlace = await db('historic_places').insert({
            'city': req.body.city,
            'country': req.body.country,
            'description': req.body.description,
            'score': req.body.score,
            'hotel': req.body.hotel,
            'month': req.body.month,
            'year': req.body.year,
            'user_id': req.userID,
        })
            .returning('*');
        const images = await getCityImages(addedPlace.city);
        const addedPlaceWithImages = { ...addedPlace[0], images };
        res.status(200).json({ addedPlaceWithImages: addedPlaceWithImages, message: 'added successfully' });
    } catch (error) {
        next(error);
    }
}
