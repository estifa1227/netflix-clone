const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');
const User = require('./models/User');

dotenv.config();

const movies = [
  {
    title: 'The Shadow Realm',
    description: 'When an ancient portal to a shadow dimension opens in downtown Los Angeles, a team of unlikely heroes must unite to prevent the darkness from consuming the world. Featuring stunning visual effects and a gripping storyline that keeps you on the edge of your seat.',
    year: 2024,
    duration: '2h 28m',
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    rating: 8.7,
    cast: [
      { name: 'Alexander Pierce', role: 'Commander Drake' },
      { name: 'Sophia Martinez', role: 'Dr. Elena Vasquez' },
      { name: 'Marcus Johnson', role: 'Agent Cross' },
      { name: 'Yuki Tanaka', role: 'Shadow Priestess' },
    ],
    director: 'Christopher Nolan',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    banner: 'https://images.unsplash.com/photo-1626814026160-223c0f7e4b6c?w=1200',
    trailer: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'trending',
    featured: true,
  },
  {
    title: 'Midnight Express',
    description: 'A thrilling ride through the neon-lit streets of Neo-Tokyo as a courier discovers a conspiracy that threatens to upend the city power structure. Packed with high-octane chase sequences and cyberpunk aesthetics.',
    year: 2024,
    duration: '2h 05m',
    genre: ['Action', 'Thriller'],
    rating: 8.4,
    cast: [
      { name: 'James Chen', role: 'Runner Kai' },
      { name: 'Emma Williams', role: 'Data Courier' },
    ],
    director: 'Denis Villeneuve',
    poster: 'https://images.unsplash.com/photo-1598899134731-24b46e6f8fbf?w=400',
    banner: 'https://images.unsplash.com/photo-1504609813442-a8924e83ff76?w=1200',
    category: 'trending',
    featured: false,
  },
  {
    title: 'Eternal Garden',
    description: 'A heartwarming tale of a botanist who discovers a mystical garden hidden beneath the city that has the power to heal both the land and broken hearts. A visually stunning journey through nature and emotion.',
    year: 2024,
    duration: '1h 58m',
    genre: ['Drama', 'Romance', 'Fantasy'],
    rating: 8.9,
    cast: [
      { name: 'Isabella Rossi', role: 'Luna' },
      { name: 'Oliver Park', role: 'The Gardener' },
    ],
    director: 'Hayao Miyazaki',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    banner: 'https://images.unsplash.com/photo-1504198266237-42e25e5a0c6b?w=1200',
    category: 'trending',
    featured: false,
  },
  {
    title: 'Crimson Tide',
    description: 'A gripping war drama set aboard a submarine during a global crisis. When the chain of command breaks down, the crew must decide between following orders or doing what they believe is right.',
    year: 2023,
    duration: '2h 15m',
    genre: ['Drama', 'Thriller', 'War'],
    rating: 8.1,
    cast: [
      { name: 'Robert Harrison', role: 'Captain' },
      { name: 'Michael Torres', role: 'Executive Officer' },
    ],
    director: 'Steven Spielberg',
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    banner: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200',
    category: 'popular',
    featured: false,
  },
  {
    title: 'Neon Nights',
    description: 'In a dystopian future where memories can be bought and sold, a detective investigates a series of impossible crimes that lead her to question the nature of reality itself.',
    year: 2024,
    duration: '2h 20m',
    genre: ['Sci-Fi', 'Thriller', 'Mystery'],
    rating: 8.6,
    cast: [
      { name: 'Aria Patel', role: 'Detective Nova' },
      { name: 'William Scott', role: 'Memory Dealer' },
    ],
    director: 'Ridley Scott',
    poster: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=400',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
    category: 'popular',
    featured: false,
  },
  {
    title: 'Laugh Factory',
    description: 'A hilarious comedy about a group of misfit stand-up comedians trying to make it big in New York City. Their journey is filled with laughter, tears, and unexpected friendships.',
    year: 2024,
    duration: '1h 45m',
    genre: ['Comedy', 'Drama'],
    rating: 7.8,
    cast: [
      { name: 'Kevin Hart Jr.', role: 'Mikey' },
      { name: 'Amy Thompson', role: 'Sarah' },
    ],
    director: 'Judd Apatow',
    poster: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400',
    banner: 'https://images.unsplash.com/photo-1527224537936-66edcb11e3b5?w=1200',
    category: 'comedy',
    featured: false,
  },
  {
    title: 'The Haunting of Blackwood Manor',
    description: 'A family moves into a Victorian mansion only to discover that its walls hold dark secrets. What follows is a terrifying descent into supernatural horror that will keep you up at night.',
    year: 2024,
    duration: '1h 55m',
    genre: ['Horror', 'Thriller', 'Mystery'],
    rating: 8.3,
    cast: [
      { name: 'Emily Black', role: 'Sarah' },
      { name: 'David Chen', role: 'Father Thomas' },
    ],
    director: 'James Wan',
    poster: 'https://images.unsplash.com/photo-1509248961158-c54d69380669?w=400',
    banner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
    category: 'horror',
    featured: false,
  },
  {
    title: 'Star Voyager',
    description: 'The year 2157. The first interstellar colony ship encounters an alien intelligence beyond human comprehension. A thought-provoking journey into the unknown reaches of space.',
    year: 2024,
    duration: '2h 32m',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    rating: 8.8,
    cast: [
      { name: 'Chris Evans Jr.', role: 'Captain Reynolds' },
      { name: 'Zoe Washington', role: 'Science Officer' },
    ],
    director: 'Christopher Nolan',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400',
    banner: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200',
    category: 'sci-fi',
    featured: false,
  },
  {
    title: 'Hearts in Paris',
    description: 'An American writer travels to Paris to overcome writers block and finds love in the most unexpected place. A beautiful romance set against the backdrop of the City of Light.',
    year: 2024,
    duration: '1h 50m',
    genre: ['Romance', 'Drama', 'Comedy'],
    rating: 7.9,
    cast: [
      { name: 'Charlotte Dupont', role: 'Marie' },
      { name: 'Ryan Cooper', role: 'Tom' },
    ],
    director: 'Sofia Coppola',
    poster: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
    banner: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    category: 'romance',
    featured: false,
  },
  {
    title: 'Iron Will',
    description: 'A former soldier turned vigilante takes on a corrupt corporation that is poisoning an entire city. An action-packed revenge story with heart-pounding fight choreography.',
    year: 2023,
    duration: '2h 10m',
    genre: ['Action', 'Thriller', 'Crime'],
    rating: 7.5,
    cast: [
      { name: 'Dwayne Stone', role: 'Marcus' },
      { name: 'Jessica Li', role: 'Reporter' },
    ],
    director: 'Michael Bay',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    category: 'action',
    featured: false,
  },
  {
    title: 'The Last Laugh',
    description: 'An aging comedian gets one last chance at glory when a young social media influencer helps him go viral. A touching comedy about legacy, friendship, and finding joy at any age.',
    year: 2024,
    duration: '1h 40m',
    genre: ['Comedy', 'Drama'],
    rating: 7.6,
    cast: [
      { name: 'Jack Nicholson Jr.', role: 'Morty' },
      { name: 'Maya Singh', role: 'Zoe' },
    ],
    director: 'Taika Waititi',
    poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400',
    banner: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200',
    category: 'comedy',
    featured: false,
  },
  {
    title: 'Beneath the Surface',
    description: 'A marine biologist discovers a new species of intelligent aquatic life deep in the Mariana Trench. What starts as a scientific breakthrough becomes a fight for survival.',
    year: 2024,
    duration: '2h 18m',
    genre: ['Sci-Fi', 'Thriller', 'Adventure'],
    rating: 8.0,
    cast: [
      { name: 'Kate Winslet', role: 'Dr. Adams' },
      { name: 'Idris Stone', role: 'Captain' },
    ],
    director: 'James Cameron',
    poster: 'https://images.unsplash.com/photo-1559827291-2650b44e03e8?w=400',
    banner: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
    category: 'sci-fi',
    featured: false,
  },
  {
    title: 'Whispers in the Dark',
    description: 'After moving into a new apartment, a young woman begins hearing whispers that only she can hear. As she investigates their source, she uncovers a decades-old mystery.',
    year: 2024,
    duration: '1h 48m',
    genre: ['Horror', 'Mystery', 'Thriller'],
    rating: 7.7,
    cast: [
      { name: 'Florence Pugh', role: 'Anna' },
      { name: 'Tom Hiddleston', role: 'Mr. Crowley' },
    ],
    director: 'Ari Aster',
    poster: 'https://images.unsplash.com/photo-1509248961158-c54d69380669?w=400',
    banner: 'https://images.unsplash.com/photo-1484502249934-deb4ae8f0b9f?w=1200',
    category: 'horror',
    featured: false,
  },
  {
    title: 'Dancing in the Rain',
    description: 'A street dancer from Brooklyn gets a shot at the world championship. But when tragedy strikes, she must find the courage to dance again. An inspiring story of perseverance.',
    year: 2023,
    duration: '1h 55m',
    genre: ['Drama', 'Romance', 'Music'],
    rating: 8.2,
    cast: [
      { name: 'Zendaya Styles', role: 'Raven' },
      { name: 'Cole Bennett', role: 'Derek' },
    ],
    director: 'Damien Chazelle',
    poster: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
    banner: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200',
    category: 'drama',
    featured: false,
  },
  {
    title: 'Rogue Agent',
    description: 'When a top intelligence agent is betrayed by his own agency, he must go off the grid to clear his name and expose a conspiracy that reaches the highest levels of government.',
    year: 2024,
    duration: '2h 22m',
    genre: ['Action', 'Thriller', 'Spy'],
    rating: 8.5,
    cast: [
      { name: 'Tom Hardy Jr.', role: 'Agent Steele' },
      { name: 'Gal Wonder', role: 'The Handler' },
    ],
    director: 'Kathryn Bigelow',
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    category: 'action',
    featured: false,
  },
  {
    title: 'Love in Tokyo',
    description: 'Two strangers meet on a bullet train from Tokyo to Kyoto and embark on an unforgettable weekend adventure that changes both their lives forever.',
    year: 2024,
    duration: '1h 48m',
    genre: ['Romance', 'Comedy', 'Drama'],
    rating: 7.8,
    cast: [
      { name: 'Sakura Ito', role: 'Hana' },
      { name: 'Chris Pine', role: 'Jack' },
    ],
    director: 'Wong Kar-wai',
    poster: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    banner: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
    category: 'romance',
    featured: false,
  },
  {
    title: 'The Green Revolution',
    description: 'A documentary following three families across the globe as they adopt sustainable living practices and fight climate change in their own communities.',
    year: 2024,
    duration: '1h 35m',
    genre: ['Documentary', 'Drama'],
    rating: 8.8,
    cast: [
      { name: 'David Attenborough', role: 'Narrator' },
    ],
    director: 'David Attenborough',
    poster: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400',
    banner: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200',
    category: 'new',
    featured: false,
  },
  {
    title: 'Cyber Storm',
    description: 'When a massive cyber attack threatens to shut down the worlds power grid, a team of hackers must work together to stop the digital apocalypse.',
    year: 2024,
    duration: '2h 00m',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    rating: 8.1,
    cast: [
      { name: 'Keanu Reeves', role: 'Zero' },
      { name: 'Scarlett Moon', role: 'Ghost' },
    ],
    director: 'The Wachowskis',
    poster: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=400',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
    category: 'new',
    featured: false,
  },
  {
    title: 'Amber Alert',
    description: 'A parents worst nightmare becomes a race against time when their daughter goes missing. This gripping thriller follows the frantic search that unfolds over 48 harrowing hours.',
    year: 2024,
    duration: '1h 50m',
    genre: ['Thriller', 'Drama', 'Mystery'],
    rating: 7.9,
    cast: [
      { name: 'Amy Adams', role: 'Mother' },
      { name: 'Jake Gyllenhaal', role: 'Detective' },
    ],
    director: 'David Fincher',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    banner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
    category: 'new',
    featured: false,
  },
  {
    title: 'The Crown Jewel',
    description: 'A team of elite thieves plans the most audacious heist in history: stealing the British Crown Jewels from the Tower of London. But nothing goes as planned.',
    year: 2023,
    duration: '2h 08m',
    genre: ['Action', 'Crime', 'Thriller'],
    rating: 7.4,
    cast: [
      { name: 'Jason Statham', role: 'The Planner' },
      { name: 'Charlize Theron', role: 'The Muscle' },
    ],
    director: 'Guy Ritchie',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    category: 'popular',
    featured: false,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    await Movie.insertMany(movies);
    console.log('Inserted seed movies');

    const adminExists = await User.findOne({ email: 'admin@streamflix.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@streamflix.com',
        password: 'admin123',
        isAdmin: true,
      });
      console.log('Admin user created: admin@streamflix.com / admin123');
    }

    const userExists = await User.findOne({ email: 'user@streamflix.com' });
    if (!userExists) {
      await User.create({
        name: 'Demo User',
        email: 'user@streamflix.com',
        password: 'user123',
      });
      console.log('Demo user created: user@streamflix.com / user123');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
