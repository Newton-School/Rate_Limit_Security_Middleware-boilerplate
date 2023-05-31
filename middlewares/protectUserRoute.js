const jwt = require('jsonwebtoken');
const JWT_SECRET = 'newtonSchool';

/*
Write a middleware function that checks if the requested resource belongs to the user whose token is passed in the Authorization header. The middleware should return a 401 status code with an error message in the JSON payload if the token is missing or invalid. It should also return a 403 status code with an error message in the JSON payload if the requested resource does not belong to the user.

The middleware should have the following signature:
function protectUserRoutes(req: Request, res: Response, next: NextFunction) => void

Possible Cases:

Token is missing: { message: 'Authentication failed: Missing token.', status: 'error' }
Token is invalid: { message: 'Authentication failed: Invalid token.', status: 'error' }
Resource doesn't belong to the user: { message: 'Access Denied', status: 'error' }
*/

const protectUserRoutes = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Missing token.', status: 'error' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId;
        const requesterId = req.body.followerId || req.body.userId;
        if (requesterId !== userId) {
            return res.status(403).json({ message: 'Access Denied', status: 'error' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token.', status: 'error' });
    }
};


module.exports = protectUserRoutes;