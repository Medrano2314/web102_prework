/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// Import the JSON data about the crowd-funded games from the games.js file
import GAMES_DATA from './games.js';

// Create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// Helper function to remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// Grab the element with the id "games-container"
const gamesContainer = document.getElementById("games-container");

// Function to add all data from the games array to the page
function addGamesToPage(games) {
    for (const game of games) { 
        // Create a new div element for each game card
        const gameCard = document.createElement("div");
        
        // Add the class "game-card" for styling
        gameCard.classList.add("game-card");

        // Set the inner HTML to include the game details
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

        // Append the game card to the container
        gamesContainer.appendChild(gameCard);
    }
}

//Calls function to add games via GAMES_JSON
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Calculate total individual contributions
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Calculate total amount of money pledged
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// Calculate total number of games
const totalGames = GAMES_JSON.length;
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log(unfundedGames.length); // Check the number of unfunded games
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log(fundedGames.length); // Check the number of funded games
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// Add event listeners to buttons
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

const displayStr = unfundedGamesCount === 1
    ? `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. 
    Currently, 1 game remains unfunded. We need your help to fund this amazing game!`
    : `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. Currently, ${unfundedGamesCount} 
    games remain unfunded. We need your help to fund these amazing games!`;

const descriptionContainer = document.getElementById("description-container");
const paragraph = document.createElement("p");
paragraph.innerHTML = displayStr;
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Sort the games by pledged amount in descending order
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Destructure to get the top two most funded games
const [topGame, secondGame] = sortedGames;

// Select the containers for the top games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Display the top funded game
const topGameElement = document.createElement("p");
topGameElement.innerHTML = `${topGame.name}`;
firstGameContainer.appendChild(topGameElement);

// Display the second most funded game
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);