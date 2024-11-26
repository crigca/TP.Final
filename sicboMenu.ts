import * as readlineSync     from "readline-sync"; // Dependency to read user input
import {Sicbo}               from "./src/Games/sicbo.ts";
export function Menu (psicboGame:Sicbo ) {
    let exit = false;    
    while (!exit) {
        console.log("\nWelcome to the Casino");
        console.log("1. Play Sicbo");
        console.log("2. Show Sicbo Rules");
        console.log("3. Exit");

        const option = readlineSync.questionInt("Select an option: ");
    
        switch (option) {
            case 1:
                console.log("\nBetting Options:");
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
                        prediction = readlineSync.questionInt("Enter your prediction (a number between 3 and 18): ");
                        break;
                    default:
                        console.log("Invalid betting option. Please try again.");
                        continue;
                }

                try {
                    // Configure the bet
                    psicboGame.setBet(betTypeText, prediction);

                    // Ask for the bet amount
                    const betAmount = readlineSync.questionInt("Enter your bet amount: ");
                    const result = psicboGame.calculateResult(betAmount);

                    // Display the dice values after calculating the result
                    const diceValues = psicboGame.getDiceValues(); // Adjusted to use the correct method
                    console.log(`Dice rolled: [${diceValues[0]}, ${diceValues[1]}, ${diceValues[2]}]`);
                    console.log("Bet result:", result);

                    // Pause to read the result
                    console.log("Press Enter to return to the menu...");
                    readlineSync.question();
                } catch (error) {
                    if (error instanceof Error) {
                        console.error("Error:", error.message);
                    } else {
                        console.error("Unknown error", error);
                    }
                }
                break;

            case 2:
                // Show Sicbo rules
                console.log("\nSicbo Rules:");
                console.log(psicboGame.getRules()); // Adjusted to use the `getRules` method
                console.log("\nPress Enter to return to the menu...");
                readlineSync.question();
                break;

            case 3:
                console.log("Thank you for playing. See you next time!");
                exit = true;
                break;

            default:
                console.log("Invalid option. Please try again.");
                readlineSync.question("Press Enter to continue...");
                break;
        }
    }
    }