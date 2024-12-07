import * as readlineSync from "readline-sync"; 
import { Casino } from "./Models/Casino";
import { showBalanceMenu } from "./View/balanceMenu";
import { showSicboMenu } from "./View/sicboMenu";
import { showBlackjackMenu } from "./View/blackjackMenu";
import { showSimpleSlotMachinesMenu } from "./View/menuSimpleSlotMachines";
import { showDeluxeSlotMachinesMenu } from "./View/menuDeluxeSlotMachine";

//Function to display welcome message
export function showWelcomeMessage(casino: Casino): void {
    console.clear();
    console.log("\n=== Initializing Casino Simulator ===");
    console.log("\n=== Welcome to the Casino Simulator ===");
    console.log(`Initial User Balance: $${casino.getUserBalance()}`);
    console.log(`Initial Casino Balance: $${casino.getCasinoBalance()}`);
    console.log("=======================================");
}

// Function to display the main menu and handle user interaction
export function showMenu(casino: Casino): void {
    let exit = false;

    // Welcome Message
    console.clear();
    console.log("\n=== Welcome to the Casino ===");

    while (!exit) {
        console.clear();
        console.log("\nWelcome to the Casino");
        console.log("1. Play a Game");
        console.log("2. View Balances");
        console.log("3. Exit");

        const option = readlineSync.questionInt("Select an option: ");

        switch (option) {
            case 1:
                const availableGames = casino.listAvailableGames();
                console.log("\nAvailable Games:");
                availableGames.forEach((game, index) => {
                    console.log(`${index + 1}. ${game}`);
                });

                const gameOption = readlineSync.questionInt("Select a game to play: ");
                const selectedGame = casino.getGame(availableGames[gameOption - 1]);

                if (selectedGame) {
                    console.log(`\nLaunching ${selectedGame.getName()}...`);

                    if (casino.getUserBalance() <= 0) {
                        console.log("You don't have enough balance to play. Game Over!");
                        console.log("The casino is resetting your balance to $50,000.");
                        casino.updateUserBalance(50000); // Reset user balance
                    }

                    // Delegate to the appropriate menu
                    switch (selectedGame.getName().toLowerCase()) {
                        case "sicbo":
                            showSicboMenu(casino);
                            break;
                        case "blackjack":
                            showBlackjackMenu(casino);
                            break;
                        case "simpleslotmachine":
                            showSimpleSlotMachinesMenu(casino);
                            break;
                        case "deluxeslotmachine":
                            showDeluxeSlotMachinesMenu(casino);
                            break;
                        default:
                            console.log("Game menu not implemented.");
                    }

                    // Check if the casino or the user is out of balance
                    const gameStatus = casino.checkGameOver();
                    if (gameStatus.gameOver) {
                        console.log(`Game Over! The winner is: ${gameStatus.winner}`);
                        casino.saveBalances(); // Save final balances to text files
                        exit = true;
                    }
                } else {
                    console.log("Invalid game selected. Please try again.");
                }
                break;

            case 2:
                if (casino.getUserBalance() <= 0) {
                    console.log("You don't have enough balance to play. Game Over!");
                    console.log("The casino is resetting your balance to $50,000.");
                    casino.updateUserBalance(50000); // Reset user balance
                }
                showBalanceMenu(casino); // Show balance menu
                break;

            case 3:
                console.log("Thank you for playing. See you next time!");
                casino.saveBalances(); // Save balances when exiting
                exit = true;
                break;

            default:
                console.log("Invalid option. Please try again.");
                readlineSync.question("Press Enter to continue...");
                break;
        }
    }
}