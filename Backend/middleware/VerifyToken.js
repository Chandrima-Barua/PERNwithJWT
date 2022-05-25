import jwt from "jsonwebtoken";
const config = process.env;
import dotenv from "dotenv";

export const verifyToken = (req, res, next) => {
    //     const authHeader = req.headers['authorization'];
    //     const token = authHeader && authHeader.split(' ')[1];
    // console.log(authHeader && authHeader.split(' '))
    //     if(token == null) return res.sendStatus(401);
    //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //         if(err) return res.sendStatus(403);
    //         req.email = decoded.email;
    //         next();
    //     })

    const token =
        req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        // console.log(req.user)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}