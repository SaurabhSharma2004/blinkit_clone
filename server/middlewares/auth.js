const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    // console.log("printing auth middleware", req);
    try {
        const token = req.cookies.accessToken || req.headers.authorization.split(' ')[1];

        // console.log("printing token in auth middleware", token);

        if (!token) {
            return res.status(401).json({ message: 'do not have accessToken', success: false });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("printing decoded token in auth middleware", decoded);
            req.userId = decoded.id;
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token', success: false });
        }
        
        next()
        
    } catch (error) {
        console.log("Error in auth middleware ", error);
        return res.status(401).json({ message: 'Unauthorized middleware', success: false });
    }
}

module.exports = {auth}