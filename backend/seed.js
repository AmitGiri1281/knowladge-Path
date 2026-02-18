const mongoose = require('mongoose');
const Category = require('./models/Category');
const Section = require('./models/Section');
const Content = require('./models/Content');

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/learning-platform');
    
    // Clear existing data
    await Category.deleteMany({});
    await Section.deleteMany({});
    await Content.deleteMany({});

    // Create Categories
    const categories = await Category.insertMany([
      {
        name: 'Computer Science',
        description: 'Learn programming, algorithms, data structures, and more',
        icon: '💻',
        color: 'blue',
        order: 1
      },
      {
        name: 'Philosophy',
        description: 'Explore the fundamental questions of existence',
        icon: '🧠',
        color: 'purple',
        order: 2
      },
      {
        name: 'Religion',
        description: 'Study world religions and spiritual traditions',
        icon: '🕉',
        color: 'red',
        order: 3
      },
      {
        name: 'Social Science',
        description: 'Understand human society and social relationships',
        icon: '🌍',
        color: 'green',
        order: 4
      },
      {
        name: 'Language',
        description: 'Learn new languages and improve communication',
        icon: '🌐',
        color: 'yellow',
        order: 5
      },
      {
        name: 'Science',
        description: 'Discover the laws of nature and universe',
        icon: '🔬',
        color: 'indigo',
        order: 6
      },
      {
        name: 'Technology',
        description: 'Stay updated with latest tech trends',
        icon: '⚙️',
        color: 'gray',
        order: 7
      },
      {
        name: 'Arts',
        description: 'Express creativity through various art forms',
        icon: '🎨',
        color: 'pink',
        order: 8
      },
      {
        name: 'Literature',
        description: 'Read and analyze great literary works',
        icon: '📚',
        color: 'orange',
        order: 9
      },
      {
        name: 'History',
        description: 'Learn from the past to understand the present',
        icon: '🏛',
        color: 'brown',
        order: 10
      }
    ]);

    // Create Sections for Computer Science
    const csSections = await Section.insertMany([
      {
        categoryId: categories[0]._id,
        name: 'Programming Basics',
        description: 'Learn fundamental programming concepts',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        order: 1
      },
      {
        categoryId: categories[0]._id,
        name: 'Data Structures',
        description: 'Master essential data structures',
        thumbnail: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2',
        order: 2
      },
      {
        categoryId: categories[0]._id,
        name: 'Algorithms',
        description: 'Understand algorithmic thinking',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
        order: 3
      }
    ]);

    // Create Content for Programming Basics
    await Content.insertMany([
      {
        sectionId: csSections[0]._id,
        title: 'Introduction to Programming',
        theory: `# Introduction to Programming

Programming is the art of telling a computer what to do. It's like giving instructions to a very literal-minded friend.

## Why Learn Programming?
- **Problem Solving**: Programming teaches you how to break down complex problems
- **Career Opportunities**: High demand for programmers worldwide
- **Creativity**: Build anything you can imagine
- **Automation**: Make computers do repetitive tasks for you

## Key Concepts
1. **Variables**: Containers for storing data
2. **Data Types**: Different kinds of data (numbers, text, etc.)
3. **Control Flow**: Making decisions and repeating actions
4. **Functions**: Reusable blocks of code

\`\`\`javascript
// Your first program
console.log("Hello, World!");
\`\`\`

## Getting Started
To start programming, you need:
- A text editor
- A programming language
- Curiosity and patience!`,
        notes: `## Quick Notes - Programming Basics

### Variables
- Store data in memory
- Have names and values
- Can change during program execution

### Common Data Types
- Numbers (integers, floats)
- Strings (text)
- Booleans (true/false)
- Arrays (lists)
- Objects (key-value pairs)

### Control Structures
- if/else statements
- loops (for, while)
- switch statements

### Best Practices
- Use meaningful variable names
- Comment your code
- Test frequently
- Break problems into small pieces`,
        videoUrl: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
        quiz: [
          {
            question: 'What is a variable in programming?',
            options: [
              'A container for storing data',
              'A type of loop',
              'A programming language',
              'An error in code'
            ],
            correctAnswer: 0,
            explanation: 'Variables are containers that hold data values that can change during program execution.'
          },
          {
            question: 'Which of the following is NOT a primitive data type?',
            options: [
              'String',
              'Number',
              'Function',
              'Boolean'
            ],
            correctAnswer: 2,
            explanation: 'Functions are not primitive data types; they are blocks of reusable code.'
          }
        ],
        resources: [
          {
            title: 'Python for Beginners',
            url: 'https://www.python.org/about/gettingstarted/',
            type: 'link'
          },
          {
            title: 'JavaScript Tutorial',
            url: 'https://javascript.info/',
            type: 'link'
          }
        ],
        order: 1
      },
      {
        sectionId: csSections[0]._id,
        title: 'Variables and Data Types',
        theory: `# Variables and Data Types

Understanding variables and data types is crucial for any programmer.

## What are Variables?
Variables are named storage locations in memory that hold data. Think of them as labeled boxes where you can store things.

## Common Data Types

### 1. Numbers
- Integers: Whole numbers (5, -3, 42)
- Floats: Decimal numbers (3.14, -0.5, 2.0)

### 2. Strings
Text data enclosed in quotes
\`\`\`javascript
let name = "John";
let message = 'Hello World';
\`\`\`

### 3. Booleans
True or false values
\`\`\`javascript
let isLoggedIn = true;
let isCompleted = false;
\`\`\`

### 4. Arrays
Ordered lists of values
\`\`\`javascript
let colors = ["red", "green", "blue"];
let numbers = [1, 2, 3, 4, 5];
\`\`\`

### 5. Objects
Key-value pairs
\`\`\`javascript
let person = {
  name: "Alice",
  age: 25,
  city: "New York"
};
\`\`\`

## Variable Naming Rules
- Must start with letter, _ or $
- Can contain letters, numbers, _, $
- Case-sensitive
- Cannot use reserved keywords

## Best Practices
- Use descriptive names
- Follow naming conventions (camelCase for JavaScript)
- Initialize variables when declaring them`,
        notes: `## Variables & Data Types Cheat Sheet

### Declaring Variables
\`\`\`javascript
let age = 25;           // Can be reassigned
const PI = 3.14;        // Cannot be reassigned
var oldWay = "avoid";   // Old way, avoid using
\`\`\`

### Type Checking
\`\`\`javascript
typeof "hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"
typeof []       // "object"
typeof {}       // "object"
\`\`\`

### Type Conversion
\`\`\`javascript
String(123)     // "123"
Number("456")   // 456
Boolean(0)      // false
Boolean(1)      // true
\`\`\`

### Common Mistakes
- Using undeclared variables
- Forgetting const for constants
- Type coercion issues
- Variable naming conflicts`,
        videoUrl: 'https://www.youtube.com/watch?v=edlFjlzxkSI',
        quiz: [
          {
            question: 'Which keyword is used to declare a variable that cannot be reassigned?',
            options: ['let', 'var', 'const', 'static'],
            correctAnswer: 2,
            explanation: 'const is used for variables that should not be reassigned after declaration.'
          },
          {
            question: 'What will typeof [1,2,3] return in JavaScript?',
            options: ['"array"', '"object"', '"list"', '"number"'],
            correctAnswer: 1,
            explanation: 'In JavaScript, arrays are objects, so typeof returns "object".'
          }
        ],
        resources: [
          {
            title: 'MDN Variables Guide',
            url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables',
            type: 'link'
          }
        ],
        order: 2
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();