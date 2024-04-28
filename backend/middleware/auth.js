const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const jwtVerify = promisify(jwt.verify).bind(jwt);

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    try {
        const decoded = await jwtVerify(token, secret);
        req.userId = decoded.userId;   // Attach user ID to the request object
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        next(err);  // Propagate error to global error handler
    }
};

module.exports = verifyJWT;
