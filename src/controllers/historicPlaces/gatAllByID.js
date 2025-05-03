import { development } from '../../../knexfile.js';
import knex from 'knex';
import { getCityImages } from '../../middlewares/getCityImage.js';

const db = knex(development);

export async function getAllByID(req, res, next) {
    try {
        const historicPlaces = await db('historic_places').select('*').where({ 'user_id': req.userID });
        const updatedPlaces = await Promise.all(
            historicPlaces.map(async (place) => {
                const images = await getCityImages(place.city);
                return { ...place, images };
            })
        );
        res.status(200).json(updatedPlaces);
    } catch (error) {
        next(error);
    }
}
