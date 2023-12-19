import jsonWebToken from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (user) => {
    return jsonWebToken.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1800s",
    });
};

const generateRefreshToken = (user) => {
    return jsonWebToken.sign(user, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "86400s",
    });
};

const verifyRefreshToken = (token) => {
    try {
        return jsonWebToken.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
};

const parseJWT = (token) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

const verifyAccessToken = (token) => {
    try {
        return jsonWebToken.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        null;
    }
};

export {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    parseJWT,
    verifyAccessToken,
};