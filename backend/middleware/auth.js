const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const jwtVerify = promisify(jwt.verify).bind(jwt);

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    try {
        const decoded = await jwtVerify(token, secret);
        req.user = { id: decoded.userId }; // Attach user object with ID to the request object
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Handle other errors
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = verifyJWT;