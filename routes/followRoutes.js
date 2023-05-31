const express = require("express");

const {
    followUser,
    unfollowUser,
    removeFollower,
    getAllFollowers,
    getAllFollowing
} = require("../controllers/followControllers");

const protectUserRoutes = require("../middlewares/protectUserRoute");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post('/follow', isLoggedIn, protectUserRoutes, followUser);
router.delete('/unfollow',isLoggedIn, protectUserRoutes, unfollowUser);
router.delete('/remove-follower', isLoggedIn, protectUserRoutes, removeFollower);
router.get('/followers', isLoggedIn, protectUserRoutes, getAllFollowers);
router.get('/following', isLoggedIn, protectUserRoutes, getAllFollowing);

module.exports = router;