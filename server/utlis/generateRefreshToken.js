const jwt = require('jsonwebtoken');
const User = require('../models/User')

const refreshToken = async (userID) => {
    try {
        const token = jwt.sign({ id:userID }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        const updatedUser = await User.findByIdAndUpdate(userID, {
            refresh_token: token,
        }, { new: true });

        if (!updatedUser) {
            console.log("User not found while generating refresh token");
            return null;
        }
        return token;
    } catch (error) {
        console.log("Error in generating refresh token ", error);
        return null;
    }
}

module.exports = refreshToken;