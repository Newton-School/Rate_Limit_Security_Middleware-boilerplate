const Post = require('../models/Post');

// Create a new post
/*
You need to implement a controller that creates a new post by storing the author and content information in the database. This controller should receive a request containing the author and content data in the request body. It should validate that both fields are provided, and if any of them are missing, return a 400 status code with a JSON response indicating the required fields.

After validating the input, the controller should create a new post object using the provided author and content. It should save the post in the database and return a 201 status code with a JSON response confirming the successful creation of the post, including the created post object.

If any error occurs during the process, the controller should catch the error, log it, and return a 500 status code with a JSON response indicating an internal server error.

Inputs:

req.body.author: The author of the post (string)
req.body.content: The content of the post (string)
Outputs:

If both the author and content fields are provided, the controller should return a 201 status code with the following JSON response:
{
    "message": "Post created successfully",
    "post": [created post object]
}
If either the author or content field is missing, the controller should return a 400 status code with the following JSON response:
{
    "message": "Author and content are required fields",
    "status": "Error"
}
If an error occurs while creating the post, the controller should return a 500 status code with the following JSON response:
{
    "message": "Internal server error",
    "status": "Error"
}
*/
const createPost = async (req, res) => {
    try {
        const { author, content } = req.body;

        if (!author || !content) {
            return res.status(400).json({ message: 'Author and content are required fields' });
        }

        const post = new Post({
            author: author,
            content: content
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post: post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Get all posts
/*
You need to implement a controller that retrieves all posts from the database and returns them as a JSON response. This controller should fetch all posts along with the associated author and comments data. It should populate the "author" field of each post with the "username" property and populate the "comments.author" field of each post with the "username" property as well.

The controller should execute a database query to retrieve all posts and their associated data. It should handle any errors that occur during the process and return an appropriate JSON response.

Inputs: None

Outputs:

If the posts are retrieved successfully, the controller should return a 200 status code with a JSON response containing an array of posts, where each post object includes the "author" and "comments.author" fields populated with the "username" property:
[   {<fully populated post objects>}, {} 
    ...
]
If an error occurs while retrieving the posts, the controller should return a 500 status code with the following JSON response
{
    "message": "Internal server error",
    "status": "Error"
}
*/
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username')
            .populate('comments.author', 'username')
            .exec();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a post by ID
/*
You need to implement a controller that retrieves a specific post from the database based on its ID and returns it as a JSON response. This controller should receive the ID of the post as a parameter in the request and execute a database query to find the corresponding post. It should populate the "author" field of the post with the "username" property and populate the "comments.author" field of the post with the "username" property as well.

The controller should handle different scenarios, including when the requested post is found, not found, or when an error occurs during the process. It should return the appropriate JSON response and status code accordingly.

Inputs:

req.params.id: The ID of the post to retrieve (string)
Outputs:

If the post is found, the controller should return a 200 status code with a JSON response containing the post object, where the "author" field is populated with the "username" property and the "comments.author" field is populated with the "username" property:
{
    "_id": "post_id",
    "author": {
        "_id": "author_id",
        "username": "author_username"
    },
    "content": "post_content",
    "comments": [
        {
            "content": "comment_content",
            "author": {
                "_id": "comment_author_id",
                "username": "comment_author_username"
            }
        }, 
        ...
    ]
}

If the post with the given ID is not found, the controller should return a 404 status code with the following JSON response:
{
    "message": "Post not found",
    "status": "Error"
}

If an error occurs while retrieving the post, the controller should return a 500 status code with the following JSON response:
{
    "message": "Internal server error",
    "status": "Error"
}
*/
const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
            .populate('author', 'username')
            .populate('comments.author', 'username')
            .exec();
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a post by ID
/*
You need to implement a controller that updates a specific post in the database based on its ID. This controller should receive the ID of the post to be updated as a parameter and the updated content in the request body. It should execute a database query to find the post with the given ID, update its content with the provided content, and return the updated post as a JSON response.

The controller should handle different scenarios, including when the requested post is found, not found, or when an error occurs during the update process. It should return the appropriate JSON response and status code accordingly.

Inputs:

req.params.id: The ID of the post to update (string)
req.body.content: The updated content of the post (string)
Outputs:

If the post is found and updated successfully, the controller should return a 200 status code with the following JSON response:
{
    "message": "Post updated successfully",
    "post": {
        "_id": "post_id",
        "content": "updated_content"
    }
}
If the post with the given ID is not found, the controller should return a 404 status code with the following JSON response:
{
    "message": "Post not found",
    "status": "Error"
}
If an error occurs while updating the post, the controller should return a 500 status code with the following JSON response:
{
    "message": "Internal server error",
    "status": "Error"
}
*/
const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content: content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a post by ID
/*
Problem Statement:

You need to implement a controller that deletes a specific post from the database based on its ID. This controller should receive the ID of the post to be deleted as a parameter in the request. It should execute a database query to find the post with the given ID, delete it from the database, and return a JSON response indicating the successful deletion of the post.

The controller should handle different scenarios, including when the requested post is found, not found, or when an error occurs during the deletion process. It should return the appropriate JSON response and status code accordingly.

Inputs:

req.params.id: The ID of the post to delete (string)
Outputs:

If the post is found and deleted successfully, the controller should return a 200 status code with the following JSON response:
{
    "message": "Post deleted successfully"
}
If the post with the given ID is not found, the controller should return a 404 status code with the following JSON response:
{
    "message": "Post not found",
    "status": "Error"
}
If an error occurs while deleting the post, the controller should return a 500 status code with the following JSON response:
{
    "message": "Internal server error",
    "status": "Error"
}
*/
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
