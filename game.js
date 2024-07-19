// Define game states and initial setup
let gameState = {
    currentScene: 'start',
    gems: {
        courage: false,
        wisdom: false,
        knowledge: false,
        harmony: false,
        leadership: false,
        spirituality: false
        // Add more gem types as needed
    }
};

// Player inventory and stats
let playerState = {
    inventory: [],
    stats: {
        strength: 10,
        magic: 5,
        diplomacy: 8
    }
};

// Scenes and choices
const scenes = {
    start: {
        text: "Welcome to the Quest for Virtue, where you embark on an adventure to discover and embody core        values that make you a hero!",
        options: [
            { text: "Enter the Whispering Woods", nextScene: "whisperingWoods" },
            { text: "Ascend to the Mystic Mountain", nextScene: "mysticMountain" },
            { text: "Explore the Royal Castle", nextScene: "royalCastle" }
        ]
    },
    whisperingWoods: {
        text: "You enter the Whispering Woods. Ancient trees whisper secrets around you...",
        options: [
            { text: "Listen to the Trees", action: function() {
                gameState.gems.wisdom = true;
                gameState.currentScene = "treesWisdom";
                updateGame();
            }},
            { text: "Navigate the Shifting Paths", action: function() {
                gameState.currentScene = "shiftingPaths";
                updateGame();
            }}
        ]
    },
    mysticMountain: {
        text: "You ascend towards the Mystic Mountain. Crystalline streams flow amidst towering peaks...",
        options: [
            { text: "Ascend to the Celestial Summit", action: function() {
                gameState.gems.spirituality = true;
                gameState.currentScene = "celestialSummit";
                updateGame();
            }},
            { text: "Explore the Crystal Caverns", action: function() {
                gameState.currentScene = "crystalCaverns";
                updateGame();
            }}
        ]
    },
    royalCastle: {
        text: "You arrive at the majestic Royal Castle. Turrets rise towards the sky and banners flutter in the breeze...",
        options: [
            { text: "Visit the Royal Library", nextScene: "royalLibrary" },
            { text: "Attend the Royal Court", nextScene: "royalCourt" }
        ]
    },
    royalLibrary: {
        text: "You enter the Royal Library, filled with ancient tomes and scrolls...",
        options: [
            { text: "Research Ancient Lore", action: function() {
                gameState.gems.knowledge = true;
                gameState.currentScene = "ancientLore";
                addToInventory("Ancient Tome");
                updateGame();
            }},
            { text: "Seek Guidance from the Librarian", action: function() {
                gameState.currentScene = "librarianGuidance";
                updateGame();
            }}
        ]
    },
    royalCourt: {
        text: "You attend the Royal Court, where decisions shaping the kingdom's fate are made...",
        options: [
            { text: "Present Your Ideas to the Monarch", action: function() {
                gameState.gems.leadership = true;
                gameState.currentScene = "presentIdeas";
                updateStats('diplomaticChoice');
                updateGame();
            }},
            { text: "Observe Court Proceedings", action: function() {
                gameState.currentScene = "observeProceedings";
                updateGame();
            }}
        ]
    },
    treesWisdom: {
        text: "The ancient trees impart their wisdom, revealing hidden truths...",
        options: [
            { text: "Continue Your Journey", nextScene: "start" }
        ]
    },
    shiftingPaths: {
        text: "You navigate the shifting paths with caution, avoiding traps and finding hidden treasures...",
        options: [
            { text: "Proceed Deeper into the Woods", nextScene: "whisperingWoods" },
            { text: "Return to the Crossroads", nextScene: "start" }
        ]
    },
    celestialSummit: {
        text: "You reach the Celestial Summit, where celestial beings share profound insights...",
        options: [
            { text: "Embrace the Wisdom", nextScene: "mysticMountain" }
        ]
    },
    crystalCaverns: {
        text: "You explore the Crystal Caverns, uncovering rare crystals and their mystical energies...",
        options: [
            { text: "Gather Luminous Crystals", nextScene: "mysticMountain" }
        ]
    },
    ancientLore: {
        text: "You delve into ancient lore, discovering lost knowledge and forgotten legends...",
        options: [
            { text: "Continue Your Research", nextScene: "royalLibrary" }
        ]
    },
    librarianGuidance: {
        text: "The librarian imparts their wisdom, shedding light on the castle's history and mysteries...",
        options: [
            { text: "Thank the Librarian", nextScene: "royalLibrary" }
        ]
    },
    presentIdeas: {
        text: "You present your ideas to the monarch, influencing decisions that shape the kingdom's future...",
        options: [
            { text: "Attend to Kingdom Matters", nextScene: "royalCourt" }
        ]
    },
    observeProceedings: {
        text: "You observe court proceedings, gaining insights into the kingdom's governance and challenges...",
        options: [
            { text: "Reflect on What You've Learned", nextScene: "royalCourt" }
        ]
    },
    // Additional scenes and choices
    secretGrove: {
        text: "You discover a hidden grove filled with mystical creatures and glowing flowers...",
        options: [
            { text: "Befriend the Creatures", action: function() {
                gameState.gems.harmony = true;
                gameState.currentScene = "befriendCreatures";
                updateGame();
            }},
            { text: "Explore Further", action: function() {
                gameState.currentScene = "exploreFurtherGrove";
                updateGame();
            }}
        ]
    },
    befriendedCreatures: {
        text: "You establish a bond with the mystical creatures, gaining their trust and learning their secrets...",
        options: [
            { text: "Continue Exploring the Grove", nextScene: "secretGrove" },
            { text: "Return to the Path", nextScene: "start" }
        ]
    },
    exploreFurtherGrove: {
        text: "You uncover a hidden spring with healing waters and a forgotten relic...",
        options: [
            { text: "Take the Relic", action: function() {
                addToInventory("Forgotten Relic");
                gameState.currentScene = "takeRelic";
                updateGame();
            }},
            { text: "Study the Healing Waters", action: function() {
                gameState.currentScene = "studyWaters";
                updateGame();
            }}
        ]
    },
    takeRelic: {
        text: "You take the Forgotten Relic, feeling its power resonating within you...",
        options: [
            { text: "Return to the Path", nextScene: "start" }
        ]
    },
    studyWaters: {
        text: "You study the healing properties of the spring, enhancing your magic abilities...",
        options: [
            { text: "Continue Exploring", nextScene: "exploreFurtherGrove" },
            { text: "Return to the Path", nextScene: "start" }
        ]
    }
};

// Function to update the game interface with current scene and options
function updateGame() {
    const currentScene = scenes[gameState.currentScene];
    const gameTextElement = document.getElementById('game-text');
    const optionsContainer = document.getElementById('options-container');
    const inventoryList = document.getElementById('inventory-list');
    const strengthStat = document.getElementById('strength-stat');
    const magicStat = document.getElementById('magic-stat');
    const diplomacyStat = document.getElementById('diplomacy-stat');

    // Update game text
    gameTextElement.innerHTML = `<p>${currentScene.text}</p>`;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Display new options
    currentScene.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-button');
        button.addEventListener('click', function() {
            if (option.action) option.action();
            else gameState.currentScene = option.nextScene;
            updateGame();
        });
        optionsContainer.appendChild(button);
    });

    // Update inventory display
    inventoryList.innerHTML = '';
    playerState.inventory.forEach(item => {
        const listItem = document.createElement('div');
        listItem.classList.add('item');
        listItem.textContent = item;
        inventoryList.appendChild(listItem);
    });

    // Update character stats display
    strengthStat.textContent = playerState.stats.strength;
    magicStat.textContent = playerState.stats.magic;
    diplomacyStat.textContent = playerState.stats.diplomacy;
}

// Example: Implementing a function to add items to inventory
function addToInventory(item) {
    playerState.inventory.push(item);
    console.log(`Added ${item} to inventory:`, playerState.inventory);
}

// Example: Implementing a function to update player stats based on choices
function updateStats(choice) {
    switch (choice) {
        case 'diplomaticChoice':
            playerState.stats.diplomacy += 2;
            break;
        // Add more cases as per your game's choices and outcomes
        default:
            break;
    }
}

// Initialize game
updateGame();

// Example: Background music control
const backgroundMusic = document.getElementById('background-music');
// Uncomment and replace 'background_music.mp3' with your actual music file path
backgroundMusic.src = 'background_music.mp3';
backgroundMusic.play();