import { checkPassword, generateAccessToken, generateRefreshToken } from "../../middlewares/auth.js";

export async function login(user, res) {
    const { username, password } = user;
    try {
        const userID = await checkPassword({ username: username, password: password });
        generateAccessToken(res, userID, username);
        await generateRefreshToken(res, userID, username);
        return 'login successful';
    } catch (error) {
        throw error;
    }
}