import * as readlineSync from "readline-sync"; // Dependency to read user input
import { SimpleSlotMachine } from "../src/Games/SimpleSlotMachine";
import { DeluxeSlotMachine } from "../src/Games/DeluxeSlotMachine";

export function MenuSlotMachines(pSimpleSlotMachine: SimpleSlotMachine, pDeluxeSlotMachine: DeluxeSlotMachine) {
    console.clear();
    let exit = false;
    
    while (!exit) {
        console.clear();
        console.log("\nWhat kind of Slotmachine you wanna play?");
        console.log("1. Play Simple Slotmachine");
        console.log("2. Play Deluxe Slotmachine");
        console.log("3. Show Slotmachine Rules");
        console.log("4. Exit");

        const option = readlineSync.questionInt("Select an option: ");
    
        switch (option) {
            case 1:
                let repeatSimpleGame = true;
                while (repeatSimpleGame) {
                    console.clear();
                    try {
                        // Rolling the reels
                        pSimpleSlotMachine.spinReels();

                        // Ask for the bet amount
                        const betAmount = readlineSync.questionInt("Enter your bet amount: ");
                        const result = pSimpleSlotMachine.calculateResult(betAmount);

                        // Display the result after calculating
                        console.log(pSimpleSlotMachine.showResult());
                        console.log("Bet result:", result);

                        // Ask if the player wants to repeat or return to the menu
                        const repeatOption = readlineSync.questionInt("Press 1 to play again, or 2 to return to the menu: ");
                        if (repeatOption === 2) {
                            repeatSimpleGame = false; // Exit the loop to return to the main menu
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            console.error("Error:", error.message);
                        } else {
                            console.error("Unknown error", error);
                        }
                    }
                }
                console.clear();
                break;

            case 2:
                let repeatDeluxeGame = true;
                while (repeatDeluxeGame) {
                    console.clear();
                    try {
                        // Rolling the reels
                        pDeluxeSlotMachine.spinReels();

                        // Ask for the bet amount
                        const betAmount = readlineSync.questionInt("Enter your bet amount: ");
                        const result = pDeluxeSlotMachine.calculateResult(betAmount);

                        // Display the result after calculating
                        console.log(pDeluxeSlotMachine.showResult());
                        console.log("Bet result:", result);

                        // Ask if the player wants to repeat or return to the menu
                        const repeatOption = readlineSync.questionInt("Press 1 to play again, or 2 to return to the menu: ");
                        if (repeatOption === 2) {
                            repeatDeluxeGame = false; // Exit the loop to return to the main menu
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            console.error("Error:", error.message);
                        } else {
                            console.error("Unknown error", error);
                        }
                    }
                }
                console.clear();
                break;

            case 3:
                console.clear();
                console.log(pDeluxeSlotMachine.getRules());
                readlineSync.question("Press Enter to go back...");
                break;

            case 4:
                console.clear();
                console.log("Thank you for playing. See you next time!");
                exit = true; // Exit the loop and close the program
                break;

            default:
                console.clear();
                console.log("Invalid option. Please try again.");
                readlineSync.question("Press Enter to continue...");
                break;
        }
    }
}
