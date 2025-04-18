const jwt = require('jsonwebtoken');

const accessToken = async (userId) => {
    try {
        const token = jwt.sign({ id:userId }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return token;
    } catch (error) {
        console.error('Error generating access token:', error);
        return null;
    }
}

module.exports = accessToken;