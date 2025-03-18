const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing"
        });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify and decode the token
        req.userId = decoded.id; // Attach the user ID from the token payload to the request
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    auth,
    JWT_SECRET
};