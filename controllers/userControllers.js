const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/*
Sample Input: 
{
    "userId": "123",
    "updatedData": {
        "username": "new_username",
        "email": "new_email@example.com",
        "bio": "new_bio"
    }
}
Sample Output: 
{
    "message": "User details updated successfully",
    "user": {
        <user object>
    }
}
*/
const editProfile = async (req, res) => {
    try {
        const { userId, updatedData } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User details updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/*
Sample Input: 

GET /api/v1/users/search?username=john

Sample Output: 
[
    {
        "_id": "123",
        "username": "john123",
        "email": "john@example.com",
        "bio": "Hi, I'm John"
        <remaining object> 
    },
    {
        "_id": "456",
        "username": "john_doe",
        "email": "johndoe@example.com",
        "bio": "Just another John"
        <remaining object> 
    }
]
*/

const searchUser = async (req, res) => {
    const { username } = req.query;
    const regex = new RegExp(username, 'i');

    try {
        const users = await User.find({ username: regex });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    editProfile,
    searchUser,
    getAllUsers
};