import { deleteRefrehToken, validateAccessToken } from "../../middlewares/auth.js";

export async function logout(accessToken, res) {
    try {
        const userID = validateAccessToken(accessToken, res).userID;
        await deleteRefrehToken(userID);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken', { path: '/auth/refreshtoken' });
        return "logged out";
    } catch (error) {
        throw error;
    }
}