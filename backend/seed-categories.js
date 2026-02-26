const mongoose = require('mongoose');
const Category = require('./models/Category');
const Section = require('./models/Section');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Section.deleteMany({});
    
    console.log('📝 Creating categories...');

    // Create 10 categories
    const categories = await Category.insertMany([
      { 
        name: 'Computer Science', 
        description: 'Learn programming, algorithms, data structures, and computing theory', 
        icon: '💻', 
        color: 'blue',
        order: 1 
      },
      { 
        name: 'Philosophy', 
        description: 'Explore fundamental questions about existence, knowledge, and ethics', 
        icon: '🧠', 
        color: 'purple',
        order: 2 
      },
      { 
        name: 'Library and Information science', 
        description: 'study material', 
        icon: '', 
        color: 'red',
        order: 3 
      },
      { 
        name: 'Social Science', 
        description: 'Understand human society, behavior, and social structures', 
        icon: '🌍', 
        color: 'green',
        order: 4 
      },
      { 
        name: 'Language', 
        description: 'Learn new languages and master communication skills', 
        icon: '🌐', 
        color: 'yellow',
        order: 5 
      },
      { 
        name: 'Science', 
        description: 'Discover physics, chemistry, biology, and the natural world', 
        icon: '🔬', 
        color: 'indigo',
        order: 6 
      },
      { 
        name: 'Technology', 
        description: 'Explore cutting-edge tech, AI, blockchain, and innovation', 
        icon: '⚙️', 
        color: 'gray',
        order: 7 
      },
      { 
        name: 'Arts', 
        description: 'Express creativity through visual arts, music, and design', 
        icon: '🎨', 
        color: 'pink',
        order: 8 
      },
      { 
        name: 'Literature', 
        description: 'Read and analyze great literary works from around the world', 
        icon: '📚', 
        color: 'orange',
        order: 9 
      },
      { 
        name: 'History', 
        description: 'Learn from the past to understand the present', 
        icon: '🏛', 
        color: 'amber',
        order: 10 
      }
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Create sections for Computer Science
    console.log('📝 Creating sections for Computer Science...');
    const csSections = await Section.insertMany([
      { categoryId: categories[0]._id, name: 'Programming Basics', description: 'Learn fundamental programming concepts', order: 1 },
      { categoryId: categories[0]._id, name: 'Data Structures', description: 'Master essential data structures', order: 2 },
      { categoryId: categories[0]._id, name: 'Algorithms', description: 'Understand algorithmic thinking', order: 3 },
      { categoryId: categories[0]._id, name: 'Web Development', description: 'Build modern web applications', order: 4 },
      { categoryId: categories[0]._id, name: 'Artificial Intelligence', description: 'Explore AI and machine learning', order: 5 }
    ]);

    // Create sections for Philosophy
    console.log('📝 Creating sections for Philosophy...');
    const philosophySections = await Section.insertMany([
      { categoryId: categories[1]._id, name: 'Ancient Philosophy', description: 'Learn from Greek and Roman philosophers', order: 1 },
      { categoryId: categories[1]._id, name: 'Ethics', description: 'Study moral philosophy and values', order: 2 },
      { categoryId: categories[1]._id, name: 'Logic', description: 'Master logical reasoning', order: 3 }
    ]);

console.log('📝 Creating Library Science sections...');

const librarySections = await Section.insertMany([
  {
    categoryId: categories[2]._id,
    name: 'Library Books',
    description: 'Explore library science books',
    order: 1
  },
  {
    categoryId: categories[2]._id,
    name: 'Research Journals',
    description: 'Academic LIS journals',
    order: 2
  },
  {
    categoryId: categories[2]._id,
    name: 'Digital Libraries',
    description: 'Modern information systems',
    order: 3
  },
  {
    categoryId: categories[2]._id,
    name: 'Knowledge Management',
    description: 'Information organization & retrieval',
    order: 4
  }
]);

    // Create sections for Social Science
    console.log('📝 Creating sections for Social Science...');
    const socialSections = await Section.insertMany([
      { categoryId: categories[3]._id, name: 'Economics', description: 'Study production and consumption', order: 1 },
      { categoryId: categories[3]._id, name: 'Political Science', description: 'Explore governance and politics', order: 2 },
      { categoryId: categories[3]._id, name: 'Sociology', description: 'Understand society and social behavior', order: 3 },
      { categoryId: categories[3]._id, name: 'Psychology', description: 'Study mind and behavior', order: 4 }
    ]);

    // Create sections for Language
    console.log('📝 Creating sections for Language...');
    const languageSections = await Section.insertMany([
      { categoryId: categories[4]._id, name: 'English', description: 'Master English language', order: 1 },
      { categoryId: categories[4]._id, name: 'Spanish', description: 'Learn Spanish', order: 2 },
      { categoryId: categories[4]._id, name: 'French', description: 'Study French', order: 3 },
      { categoryId: categories[4]._id, name: 'Hindi', description: 'Learn Hindi', order: 4 }
    ]);

    // Create sections for Science
    console.log('📝 Creating sections for Science...');
    const scienceSections = await Section.insertMany([
      { categoryId: categories[5]._id, name: 'Physics', description: 'Study matter and energy', order: 1 },
      { categoryId: categories[5]._id, name: 'Chemistry', description: 'Explore elements and compounds', order: 2 },
      { categoryId: categories[5]._id, name: 'Biology', description: 'Study living organisms', order: 3 },
      { categoryId: categories[5]._id, name: 'Astronomy', description: 'Explore the universe', order: 4 }
    ]);

    // Create sections for Technology
    console.log('📝 Creating sections for Technology...');
    const techSections = await Section.insertMany([
      { categoryId: categories[6]._id, name: 'Web Development', description: 'Build websites and web apps', order: 1 },
      { categoryId: categories[6]._id, name: 'Mobile Development', description: 'Create mobile apps', order: 2 },
      { categoryId: categories[6]._id, name: 'DevOps', description: 'Learn deployment and operations', order: 3 },
      { categoryId: categories[6]._id, name: 'Cybersecurity', description: 'Protect systems and data', order: 4 }
    ]);

    // Create sections for Arts
    console.log('📝 Creating sections for Arts...');
    const artsSections = await Section.insertMany([
      { categoryId: categories[7]._id, name: 'Painting', description: 'Learn painting techniques', order: 1 },
      { categoryId: categories[7]._id, name: 'Music', description: 'Study music theory and practice', order: 2 },
      { categoryId: categories[7]._id, name: 'Photography', description: 'Master photography', order: 3 },
      { categoryId: categories[7]._id, name: 'Design', description: 'Learn graphic design', order: 4 }
    ]);

    // Create sections for Literature
    console.log('📝 Creating sections for Literature...');
    const litSections = await Section.insertMany([
      { categoryId: categories[8]._id, name: 'Poetry', description: 'Explore poetic forms', order: 1 },
      { categoryId: categories[8]._id, name: 'Fiction', description: 'Study novels and stories', order: 2 },
      { categoryId: categories[8]._id, name: 'Drama', description: 'Learn about plays', order: 3 },
      { categoryId: categories[8]._id, name: 'Literary Criticism', description: 'Analyze literature', order: 4 }
    ]);

    // Create sections for History
    console.log('📝 Creating sections for History...');
    const historySections = await Section.insertMany([
      { categoryId: categories[9]._id, name: 'Ancient History', description: 'Study ancient civilizations', order: 1 },
      { categoryId: categories[9]._id, name: 'Medieval History', description: 'Explore the Middle Ages', order: 2 },
      { categoryId: categories[9]._id, name: 'Modern History', description: 'Learn about modern era', order: 3 },
      { categoryId: categories[9]._id, name: 'World History', description: 'Global historical perspective', order: 4 }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - ${categories.length} Categories`);
    console.log(`   - ${await Section.countDocuments()} Sections`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

seedDatabase();