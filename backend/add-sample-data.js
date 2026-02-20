const mongoose = require('mongoose');
const Content = require('./models/Content');
const Section = require('./models/Section');
require('dotenv').config();

async function addSampleData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get any section (first one)
    const section = await Section.findOne();
    
    if (!section) {
      console.log('❌ No sections found. Please run seed.js first.');
      console.log('Run: node seed.js');
      process.exit(1);
    }

    console.log(`📝 Using section: ${section.name} (${section._id})`);

    // Check if content already exists
    const existingContent = await Content.countDocuments();
    if (existingContent > 0) {
      console.log(`⚠️ Database already has ${existingContent} content items.`);
      const answer = await askQuestion('Add more? (y/n): ');
      if (answer.toLowerCase() !== 'y') {
        process.exit(0);
      }
    }

    // Sample content
    const sampleContents = [
      {
        sectionId: section._id,
        title: 'Introduction to JavaScript',
        theory: `# JavaScript Basics\n\nJavaScript is the programming language of the web.`,
        notes: 'Key points about JavaScript',
        views: 150,
        createdAt: new Date()
      },
      {
        sectionId: section._id,
        title: 'React Hooks Explained',
        theory: `# React Hooks\n\nHooks let you use state in functional components.`,
        notes: 'useState, useEffect, useContext',
        views: 89,
        createdAt: new Date(Date.now() - 86400000)
      },
      {
        sectionId: section._id,
        title: 'Python for Beginners',
        theory: `# Python\n\nPython is easy to learn.`,
        notes: 'Simple syntax, great for beginners',
        views: 210,
        createdAt: new Date(Date.now() - 172800000)
      }
    ];

    await Content.insertMany(sampleContents);
    console.log('✅ Sample content added successfully!');
    
    const newCount = await Content.countDocuments();
    console.log(`📊 Total content now: ${newCount}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Simple prompt function
function askQuestion(question) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

addSampleData();