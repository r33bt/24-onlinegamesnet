const fs = require('fs');
const path = require('path');

// Import current games data
const gamesData = require('../data/games.json');

// Category mapping with gradients
const categoryMap = {
  quick: {
    name: 'Quick Games',
    slug: 'quick',
    description: 'Perfect for short breaks! Lightning-fast games you can play in just 2-5 minutes.',
    icon: '⚡',
    gradient: 'from-yellow-400 to-orange-400',
    featured_order: 0,
    tips: [
      { icon: '🧠', text: 'Perfect brain break to refresh your mind' },
      { icon: '⏰', text: 'Fits perfectly into any schedule or routine' },
      { icon: '🎯', text: 'Quick wins boost mood and productivity' }
    ]
  },
  puzzle: {
    name: 'Puzzle Games',
    slug: 'puzzle', 
    description: 'Brain-teasing logic challenges that test your problem-solving skills.',
    icon: '🧩',
    gradient: 'from-green-400 to-teal-400',
    featured_order: 1,
    tips: [
      { icon: '🧠', text: 'Enhance cognitive abilities and memory' },
      { icon: '🎯', text: 'Improve problem-solving skills' },
      { icon: '😌', text: 'Relaxing yet mentally stimulating' }
    ]
  },
  action: {
    name: 'Action Games',
    slug: 'action',
    description: 'Fast-paced skill-based games that test your reflexes and coordination.',
    icon: '🎯',
    gradient: 'from-red-400 to-orange-400',
    featured_order: 2,
    tips: [
      { icon: '⚡', text: 'Improve hand-eye coordination' },
      { icon: '🎯', text: 'Enhance reaction time and reflexes' },
      { icon: '🔥', text: 'Adrenaline-pumping excitement' }
    ]
  },
  racing: {
    name: 'Racing & Sports',
    slug: 'racing',
    description: 'High-speed competitive games and sports simulations.',
    icon: '🏎️',
    gradient: 'from-orange-400 to-red-400',
    featured_order: 3,
    tips: [
      { icon: '🏁', text: 'Experience thrilling competition' },
      { icon: '🎮', text: 'Master timing and precision' },
      { icon: '🏆', text: 'Competitive gameplay elements' }
    ]
  },
  strategy: {
    name: 'Strategy & RPG',
    slug: 'strategy',
    description: 'Strategic thinking games that challenge your planning and decision-making.',
    icon: '⚔️',
    gradient: 'from-purple-400 to-purple-600',
    featured_order: 4,
    tips: [
      { icon: '🧠', text: 'Develop strategic thinking skills' },
      { icon: '📊', text: 'Practice resource management' },
      { icon: '🎯', text: 'Long-term planning and patience' }
    ]
  },
  creative: {
    name: 'Creative & Simulation',
    slug: 'creative',
    description: 'Creative and simulation games that let your imagination run wild.',
    icon: '🎨',
    gradient: 'from-pink-400 to-pink-600',
    featured_order: 5,
    tips: [
      { icon: '🎨', text: 'Express creativity and imagination' },
      { icon: '🏗️', text: 'Build and create virtual worlds' },
      { icon: '🌟', text: 'Unlimited creative possibilities' }
    ]
  },
  cards: {
    name: 'Cards & Board',
    slug: 'cards',
    description: 'Classic card and board games with timeless appeal.',
    icon: '🃏',
    gradient: 'from-blue-400 to-indigo-400',
    featured_order: 6,
    tips: [
      { icon: '🎲', text: 'Classic gameplay never goes out of style' },
      { icon: '🧠', text: 'Strategic thinking and memory skills' },
      { icon: '🎯', text: 'Perfect for casual gaming sessions' }
    ]
  },
  multiplayer: {
    name: 'Multiplayer',
    slug: 'multiplayer',
    description: 'Party and social games perfect for playing with friends.',
    icon: '👥',
    gradient: 'from-teal-400 to-teal-600',
    featured_order: 7,
    tips: [
      { icon: '👨‍👩‍👧‍👦', text: 'Perfect for social gaming sessions' },
      { icon: '🎉', text: 'Create memorable moments with friends' },
      { icon: '🏆', text: 'Competitive multiplayer action' }
    ]
  }
};

// Normalize time duration
function normalizeTimeDuration(time) {
  if (!time) return '5-10 min';
  if (time.includes('∞')) return time;
  return time.replace(/(\d+)-(\d+)\s*min/, '- min');
}

// Validate and clean game data
function validateGameData(game, categoryKey) {
  return {
    title: game.title || 'Untitled Game',
    slug: game.id || game.title?.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    url: game.url || '#',
    description: game.description || 'No description available',
    time_duration: normalizeTimeDuration(game.time),
    rating: Math.min(Math.max(parseInt(game.rating) || 3, 1), 5),
    icon: game.icon || '🎮',
    featured: false,
    category: categoryKey
  };
}

// Generate Strapi import data
const strapiData = {
  categories: Object.entries(categoryMap).map(([key, cat]) => cat),
  games: []
};

// Process games
Object.entries(gamesData).forEach(([categoryKey, games]) => {
  games.forEach(game => {
    strapiData.games.push(validateGameData(game, categoryKey));
  });
});

// Write processed data
fs.writeFileSync(
  path.join(__dirname, 'strapi-import-data.json'),
  JSON.stringify(strapiData, null, 2)
);

console.log('Migration data prepared successfully!');
console.log('Categories: ' + strapiData.categories.length);
console.log('Games: ' + strapiData.games.length);
