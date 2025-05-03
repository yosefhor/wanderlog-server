import { generateAccessToken, validateRefrehToken } from "../../middlewares/auth.js";

export async function renewAccessToken(refrehToken, res) {
    try {
        const {userID, username} = validateRefrehToken(refrehToken, res);
        generateAccessToken(res, userID, username);
        return username;
    } catch (error) {
        throw error;
    }
};