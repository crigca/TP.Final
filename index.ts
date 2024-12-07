import { GameManager } from "./src/Models/GameManager";
import { Casino } from "./src/Models/Casino";
import { Balance } from "./src/Models/Balance";
import * as Menu from "./src/menu"

// Main program execution
function main(): void {
    console.clear();
    console.log("\n=== Initializing Casino Simulator ===");

    // Load the balance from the file balance.txt or use default values
    const balance = Balance.fromFile();  // Load balance from balance.txt

    // Instantiate GameManager
    const gameManager = new GameManager();

    // Get the instance of Casino and configure dependencies
    const casino = Casino.getInstance();
    casino.setGameManager(gameManager);
    casino.setBalance(balance);

    //Show the welcome message
    Menu.showWelcomeMessage(casino);

    // Launch the main menu
    Menu.showMenu(casino);   
}

// Execute the main function
main();