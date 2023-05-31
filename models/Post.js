const mongoose = require('mongoose');

/*
You need to implement a model for a post in a social media application. The PostSchema defines the structure and validation rules for the post document in the MongoDB database.

The PostSchema has the following fields:

author: Represents the author of the post. It is of type mongoose.Schema.Types.ObjectId and refers to the User model. The field is required, ensuring that every post has an associated author.

content: Stores the content or text of the post. It is of type String and is required, ensuring that every post has content.

likes: An array that contains the ObjectIDs of users who liked the post. Each like is represented by a mongoose.Schema.Types.ObjectId referencing the User model. It allows for tracking the users who liked a particular post.

comments: An array that holds the comments made on the post. Each comment object has the following fields:

author: Represents the author of the comment. It is of type mongoose.Schema.Types.ObjectId and refers to the User model. The field is required, ensuring that every comment has an associated author.
content: Stores the content or text of the comment. It is of type String and is required, ensuring that every comment has content.
createdAt: Indicates the date and time when the comment was created. It is of type Date and has a default value of the current date and time.
createdAt: Represents the date and time when the post was created. It is of type Date and has a default value of the current date and time.

By implementing this model, you can create, retrieve, update, and delete posts in your social media application.

Sample Object: 
{
  author: "author_id_1",
  content: "This is a sample post",
  likes: [
    "user_id_1",
    "user_id_2"
  ],
  comments: [
    {
      author: "comment_author_id_1",
      content: "Great post!",
      createdAt: "2023-05-16T10:30:00.000Z"
    },
    {
      author: "comment_author_id_2",
      content: "I agree!",
      createdAt: "2023-05-16T11:15:00.000Z"
    }
  ],
  createdAt: "2023-05-16T09:00:00.000Z"
}
*/

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;