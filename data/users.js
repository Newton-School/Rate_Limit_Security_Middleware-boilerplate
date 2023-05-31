const users = [
  {
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password1',
    profilePicture: 'https://example.com/profile-picture.jpg',
    bio: 'Web developer, coffee addict, and fitness enthusiast',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    socialMediaHandles: { twitter: 'johndoe', linkedin: 'johndoe' },
    interests: ['web development', 'fitness', 'coffee'],
    privacySettings: {
      isProfilePublic: true,
    },
  },
  {
    username: 'janedoe',
    email: 'janedoe@example.com',
    password: 'password2',
    profilePicture: 'https://example.com/profile-picture.jpg',
    bio: 'Graphic designer and cat lover',
    location: 'New York, NY',
    website: 'https://janedoe.com',
    socialMediaHandles: {
      twitter: 'janedoe',
      linkedin: '',
    },
    interests: ['graphic design', 'cats'],
    privacySettings: {
      isProfilePublic: false,
    },
  },
  {
    username: 'bobsmith',
    email: 'bobsmith@example.com',
    password: 'password3',
    profilePicture: 'https://example.com/default-profile-picture.jpg',
    bio: '',
    location: '',
    website: '',
    socialMediaHandles: {
      twitter: '',
      linkedin: 'bobsmith',
    },
    interests: ['music', 'movies'],
    privacySettings: {
      isProfilePublic: true,
    },
  },
];

module.exports = users;
