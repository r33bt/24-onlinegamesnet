const STRAPI_URL = 'http://127.0.0.1:1337';

// Proper game-to-category mapping based on game names
const gameCategories = {
  // Quick Games (fast, casual)
  'quick-games': ['2048', 'Google Snake', 'Tetris', 'Cookie Clicker', 'Flappy Bird', 'Chrome Dino', 'Pac-Man', 'Bubble Shooter'],
  
  // Puzzle Games (brain teasers)  
  'puzzle-games': ['Wordle', 'Sudoku', 'Daily Crossword', 'Jigsaw Puzzles', 'Solitaire', 'Mahjong', 'Word Cookies', 'Connect 4'],
  
  // Action Games (fast-paced)
  'action-games': ['Slither.io', 'Agar.io', 'Zombie Shooter', 'Space Invaders'],
  
  // Additional games can be distributed to other categories
  'racing-sports': ['Racing Game', 'Football', 'Basketball'],
  'strategy-rpg': ['Chess', 'Tower Defense', 'Risk'],
  'creative-simulation': ['Minecraft Classic', 'SimCity'],
  'cards-board': ['Poker', 'Blackjack', 'Checkers'],
  'multiplayer': ['Among Us', 'Skribbl.io']
};

async function distributeGamesProperly() {
  console.log('🎯 Distributing games to correct categories...');
  
  const response = await fetch(STRAPI_URL + '/api/games');
  const games = await response.json();
  
  let updatedCount = 0;
  
  for (const game of games.data) {
    // Find which category this game should belong to
    let correctCategory = null;
    
    for (const [category, gameNames] of Object.entries(gameCategories)) {
      if (gameNames.includes(game.name)) {
        correctCategory = category;
        break;
      }
    }
    
    // If we found a match and it's different from current
    if (correctCategory && game.category_slug !== correctCategory) {
      console.log(`Moving "${game.name}": ${game.category_slug || 'empty'} → ${correctCategory}`);
      
      try {
        await fetch(STRAPI_URL + '/api/games/' + game.documentId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            data: { category_slug: correctCategory }
          }),
        });
        updatedCount++;
      } catch (error) {
        console.log('✗ Failed:', error.message);
      }
    }
  }
  
  console.log(`✅ Properly distributed ${updatedCount} games`);
}

distributeGamesProperly();
