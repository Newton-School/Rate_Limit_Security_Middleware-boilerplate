const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/*
Sample Object: 
{
  "_id": "614dd61e8d48c238f9dca5f1",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123",
  "profilePicture": "https://example.com/profile-picture.jpg",
  "bio": "Web developer, coffee addict, and fitness enthusiast",
  "location": "San Francisco, CA",
  "website": "https://johndoe.com",
  "socialMediaHandles": {
    "twitter": "johndoe",
    "instagram": "johndoe",
    "linkedin": "johndoe"
  },
  "interests": ["web development", "fitness", "coffee"],
  "privacySettings": {
    "isProfilePublic": true
  },
  "createdAt": "2021-09-25T12:00:00.000Z",
  "updatedAt": "2021-09-25T12:30:00.000Z",
}

*/
const userSchema = new mongoose.Schema(
  {
    sentMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    receivedMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    // Other user fields...
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 8) {
          throw new Error('password should be at least 8 characters long');
        }
      },
    },
    profilePicture: {
      type: String,
      default: 'https://example.com/default-profile-picture.jpg',
    },
    bio: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    socialMediaHandles: {
      twitter: {
        type: String,
        default: '',
      },
      linkedin: {
        type: String,
        default: '',
      },
    },
    interests: [
      {
        type: String,
      },
    ],
    privacySettings: {
      isProfilePublic: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

// pre-save hook to hash password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model('User', userSchema);
