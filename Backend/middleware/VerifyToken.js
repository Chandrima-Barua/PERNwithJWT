import jwt from "jsonwebtoken";
const config = process.env;

/*
* Handles the authentication token
*/
export const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};