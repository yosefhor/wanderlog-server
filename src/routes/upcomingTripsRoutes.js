import express from 'express';
import { addTrip } from '../controllers/upcomingTrips/addTrip.js';
import { updateTrip } from '../controllers/upcomingTrips/updateTrip.js';
import { getAllByID } from '../controllers/upcomingTrips/gatAllByID.js';
import { deleteTrip } from '../controllers/upcomingTrips/deleteTrip.js';
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
    await addTrip(req, res, next);
})

router.put('/update', async (req, res, next) => {
    await updateTrip(req, res, next);
})

router.delete('/delete', async (req, res, next) => {
    await deleteTrip(req, res, next);
})

export default router;