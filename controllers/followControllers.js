const User = require('../models/User');
const Follow = require('../models/Follow');

// Follow a user

/*
Sample Input:
{
  "followerId": "611d9e5d2c992a1f5a5b95d8",
  "followingId": "611d9e5d2c992a1f5a5b95d9"
}
Sample Output:
{
  "_id": "611d9e5d2c992a1f5a5b95da",
  "follower": "611d9e5d2c992a1f5a5b95d8",
  "following": "611d9e5d2c992a1f5a5b95d9",
  "createdAt": "2023-04-21T10:00:00.000Z",
  "updatedAt": "2023-04-21T10:00:00.000Z",
  "__v": 0
}
HTTP status code: 201 (Created)
-------------------------------------------
Sample Input:
{
  "followerId": "611d9e5d2c992a1f5a5b95d8",
  "followingId": "611d9e5d2c992a1f5a5b95d9"
}
Sample Output:
{
  "error": "You are already following this user"
}
HTTP status code: 400 (Bad Request)
-------------------------------------------
Sample Input:
{
  "followerId": "611d9e5d2c992a1f5a5b95d8",
  "followingId": "611d9e5d2c992a1f5a5b95da"
}
Sample Output:
{
  "error": "User not found"
}
HTTP status code: 404 (Not Found)
-------------------------------------------
Sample Input:
{
  "followerId": "invalidId",
  "followingId": "611d9e5d2c992a1f5a5b95d9"
}
Sample Output:
{
  "error": "Server error"
}
HTTP status code: 500 (Internal Server Error)
*/
async function followUser(req, res) {
  try {
    const { followerId, followingId } = req.body;


    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);
    if (!follower || !following) {
      return res.status(404).json({ error: 'User not found' });
    }


    const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });
    if (existingFollow) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    const follow = new Follow({ follower: followerId, following: followingId });
    await follow.save();

    res.status(201).json(follow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Unfollow a user
/*
Sample Input:
{
  "followerId": "6141878fc609042b6f0a6eb0",
  "followingId": "6141878fc609042b6f0a6eb1"
}
Sample Output (HTTP Code: 200):
{
  "message": "Unfollowed successfully"
}
----------------------------------------
Sample Input:
{
  "followerId": "6141878fc609042b6f0a6eb0",
  "followingId": "6141878fc609042b6f0a6eb1"
}
Sample Output (HTTP Code: 400):
{
  "error": "You are not following this user"
}
----------------------------------------
Sample Input:
{
  "followerId": "6141878fc609042b6f0a6eb0",
  "followingId": "invalid_id"
}
Sample Output (HTTP Code: 404):
{
  "error": "User not found"
}
*/
async function unfollowUser(req, res) {
  try {
    const { followerId, followingId } = req.body;


    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);
    if (!follower || !following) {
      return res.status(404).json({ error: 'User not found' });
    }


    const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });
    if (!existingFollow) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    await existingFollow.remove();

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Remove a follower
/*
Sample Input:
{
    "followerId": "6141878fc609042b6f0a6eb0",
    "followingId": "6141878fc609042b6f0a6eb1"
}
Sample Output (HTTP Code: 200):
{
    "message": "Follower removed successfully"
}
Sample Input:
{
    "followerId": "6141878fc609042b6f0a6eb0",
    "followingId": "6141878fc609042b6f0a6eb2"
}
Sample Output (HTTP Code: 400):
{
    "error": "This user is not following you"
}
*/
async function removeFollower(req, res) {
  try {
    const { userId, followingId } = req.body;

    const follower = await User.findById(followingId);
    const following = await User.findById(userId);
    if (!follower || !following) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingFollow = await Follow.findOne({ follower: followingId, following: userId });
    if (!existingFollow) {
      return res.status(400).json({ error: 'This user is not following you' });
    }

    await existingFollow.remove();

    res.status(200).json({ message: 'Follower removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get all followers of a user
/*
Sample Input:
{
    "userId": "6141878fc609042b6f0a6eb0"
}
Sample Output (HTTP Code: 200):
[
    {
        "_id": "612b8cc47f0cc30f68b35c58",
        "follower": {
            "_id": "6141878fc609042b6f0a6eb2",
            "username": "johndoe",
            "email": "johndoe@example.com"
        }
    },
    {
        "_id": "612b8c7e7f0cc30f68b35c57",
        "follower": {
            "_id": "6141878fc609042b6f0a6eb3",
            "username": "janedoe",
            "email": "janedoe@example.com"
        }
    }
]
Sample Input:
{
    "userId": "invalid_id"
}
Sample Output (HTTP Code: 404):
{
    "error": "User not found"
}

*/
async function getAllFollowers(req, res) {
  try {
    const { userId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followers = await Follow.find({ following: userId })
      .populate('follower');
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get all users that a user is following
/*
Sample Input:
{
    "userId": "6141878fc609042b6f0a6eb0"
}
Sample Output (HTTP Code: 200):
[
    {
        "_id": "612b8cc47f0cc30f68b35c58",
        "following": {
            "_id": "6141878fc609042b6f0a6eb2",
            "username": "johndoe",
            "email": "johndoe@example.com"
        }
    },
    {
        "_id": "612b8c7e7f0cc30f68b35c57",
        "following": {
            "_id": "6141878fc609042b6f0a6eb3",
            "username": "janedoe",
            "email": "janedoe@example.com"
        }
    }
]
*/
async function getAllFollowing(req, res) {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const following = await Follow.find({ follower: userId }).populate(
      'following'
    );

    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  followUser,
  unfollowUser,
  removeFollower,
  getAllFollowers,
  getAllFollowing
};