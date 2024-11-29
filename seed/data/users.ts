export default [
  {
    id: 'user1',
    username: 'JohnDoe',
    preferences: {
      favoriteGenres: ['Action', 'SciFi'],
      dislikedGenres: ['Romance'],
    },
    watchHistory: [
      {
        contentId: 'movie1',
        watchedOn: '2023-01-01T00:00:00Z',
        rating: 4.5,
      },
      {
        contentId: 'movie2',
        watchedOn: '2023-02-15T00:00:00Z',
        rating: 3.0,
      },
    ],
  },
  {
    id: 'user2',
    username: 'JaneSmith',
    preferences: {
      favoriteGenres: ['Drama', 'Romance'],
      dislikedGenres: ['Horror'],
    },
    watchHistory: [
      {
        contentId: 'movie3',
        watchedOn: '2023-03-10T00:00:00Z',
      },
    ],
  },
  {
    id: 'user3',
    username: 'MikeJohnson',
    preferences: {
      favoriteGenres: ['Comedy', 'Horror'],
      dislikedGenres: ['Fantasy'],
    },
    watchHistory: [
      {
        contentId: 'movie4',
        watchedOn: '2023-04-05T00:00:00Z',
        rating: 5.0,
      },
    ],
  },
  {
    id: 'user4',
    username: 'AliceBrown',
    preferences: {
      favoriteGenres: ['Fantasy', 'SciFi'],
      dislikedGenres: ['Action'],
    },
    watchHistory: [],
  },
  {
    id: 'user5',
    username: 'ChrisGreen',
    preferences: {
      favoriteGenres: ['Action', 'Horror'],
      dislikedGenres: ['Comedy'],
    },
    watchHistory: [],
  },
];
