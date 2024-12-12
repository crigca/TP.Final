import * as readlineSync from "readline-sync";
import { Casino } from "../Models/Casino";
import { Sicbo } from "../Games/Sicbo";

export function showSicboMenu(casino: Casino): void {
    const sicboGame = casino.getGame("sicbo") as Sicbo;
    if (!sicboGame) {
        console.error("Sicbo game is not available in the Casino.");
        return;
    }

    let exit = false;

    while (!exit) {
        console.clear();
        console.log("\n=== Sicbo Menu ===");
        console.log("1. Place a Bet");
        console.log("2. Show Sicbo Rules");
        console.log("3. Return to Main Menu");

        const option = readlineSync.questionInt("Select an option: ");

        switch (option) {
            case 1:
                console.log("\n=== Betting Options ===");
                console.log("1. Small Bet (3 to 10)");
                console.log("2. Big Bet (11 to 18)");
                console.log("3. Triple Bet (e.g., 3-3-3)");
                console.log("4. Exact Bet (guess the exact sum between 3 and 18)");

                const betType = readlineSync.questionInt("Select a betting option (1-4): ");
                let betTypeText = "";
                let prediction: number | undefined;

                switch (betType) {
                    case 1:
                        betTypeText = "Small";
                        break;
                    case 2:
                        betTypeText = "Big";
                        break;
                    case 3:
                        betTypeText = "Triple";
                        break;
                    case 4:
                        betTypeText = "Exact";
                        while (true) {
                            prediction = readlineSync.questionInt("Enter your prediction (a number between 3 and 18): ");
                            if (prediction >= 3 && prediction <= 18) {
                                break;
                            } else {
                                console.log("Invalid prediction. Please enter a number between 3 and 18.");
                            }
                        }
                        break;
                    default:
                        console.log("Invalid option. Try again.");
                        continue;
                }

                try {
                    // Set the bet type and prediction
                    sicboGame.setBet(betTypeText, prediction);

                    // Get the bet amount
                    const betAmount = readlineSync.questionInt("Enter your bet amount: ");

                    // Validate the bet amount against the user's balance
                    const userBalance = casino.getUserBalance();
                    if (betAmount > userBalance) {
                        throw new Error("Insufficient balance to place this bet.");
                    }

                    // Calculate the result
                    const result = sicboGame.calculateResult(betAmount);

                    // Display the dice values rolled
                    console.log(`\nDice rolled: [${sicboGame.getDiceValues().join(", ")}]`);

                    // Display the result of the bet
                    console.log(result.userWins ? "You win!" : "You lose.");

                    // Update balances based on the result
                    if (result.userWins) {
                        console.log(`You win! Your winnings: $${betAmount}`);
                        casino.updateUserBalance(betAmount);
                        casino.updateCasinoBalance(-betAmount);
                    } else {
                        console.log(`You lose. You lost: $${betAmount}`);
                        casino.updateCasinoBalance(betAmount);
                        casino.updateUserBalance(-betAmount);
                    }

                    // Show updated balances
                    console.log(`User Balance: $${casino.getUserBalance()}`);
                    console.log(`Casino Balance: $${casino.getCasinoBalance()}`);

                    // Check if the game is over
                    const gameStatus = casino.checkGameOver();
                    if (gameStatus.gameOver) {
                        console.log(`Game Over! The winner is: ${gameStatus.winner}`);
                        casino.saveBalances();
                        exit = true;
                    } else {
                        const continueOption = readlineSync.questionInt("\n1. Play Again\n2. Return to Menu\nSelect: ");
                        if (continueOption === 2) {
                            exit = true; // Exit the loop and return to the main menu
                        }
                    }
                } catch (error) {
                    console.error(error instanceof Error ? `Error: ${error.message}` : "An unexpected error occurred.");
                }
                break;

            case 2:
                console.log(sicboGame.getRules());
                readlineSync.question("Press Enter to return to the menu...");
                break;

            case 3:
                console.log("Returning to Main Menu...");
                exit = true;
                break;

            default:
                console.log("Invalid option.");
        }
    }
}
