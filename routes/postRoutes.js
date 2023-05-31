const express = require("express");

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require("../controllers/postControllers");


const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;