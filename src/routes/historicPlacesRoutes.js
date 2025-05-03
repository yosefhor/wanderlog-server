import express from 'express';
import { addPlace } from '../controllers/historicPlaces/addPlace.js';
import { updatePlace } from '../controllers/historicPlaces/updatePlace.js';
import { getAllByID } from '../controllers/historicPlaces/gatAllByID.js';
import { deletePlace } from '../controllers/historicPlaces/deletePlace.js';
import { validateAccessToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const userID = await validateAccessToken(accessToken).userID;
        req.userID = userID;
        next();
    } catch (error) {
        next(error);
    }
})

router.get('/get-all-by-id', async (req, res, next) => {
    await getAllByID(req, res, next);
})

router.post('/add', async (req, res, next) => {
    await addPlace(req, res, next);
})

router.put('/update', async (req, res, next) => {
    await updatePlace(req, res, next);
})

router.delete('/delete', async (req, res, next) => {
    await deletePlace(req, res, next);
})

export default router;