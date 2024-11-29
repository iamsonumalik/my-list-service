import mongoose from 'mongoose';
import users from './data/users';
import movies from './data/movie';
import tvshows from './data/tvshow';
import { UserModel, UserSchema } from '../src/user/schema/user.schema';
import { MovieSchema } from '../src/movie/schema/movie.schema';
import { TVShowSchema } from '../src/tvshow/schema/tvshow.schema';

const MONGO_URI = 'mongodb://localhost:27017/list-db';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const MovieModel = mongoose.model('Movie', MovieSchema);
    const TVShowModel = mongoose.model('TVShow', TVShowSchema);
    await UserModel.deleteMany({});
    await MovieModel.deleteMany({});
    await TVShowModel.deleteMany({});

    await UserModel.insertMany(users);
    await MovieModel.insertMany(movies);
    await TVShowModel.insertMany(tvshows);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
