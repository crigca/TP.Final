import * as readlineSync from "readline-sync";
import { Casino } from "../Models/Casino";
import { DeluxeSlotMachine } from "../Games/DeluxeSlotMachine";

export function showDeluxeSlotMachinesMenu(casino: Casino): void {
    const deluxeSlotMachine = casino.getGame("deluxeSlotMachine") as DeluxeSlotMachine;
    let exit = false;

    while (!exit) {
        console.clear();
        console.log("\nDeluxe Slot Machines Menu");
        console.log("1. Play Deluxe SlotMachine");
        console.log("2. Show SlotMachine Rules");
        console.log("3. Exit");

        const option = readlineSync.questionInt("Select an option: ");

        switch (option) {

            case 1:
                try {                    
                    let betAmountDeluxe = readlineSync.questionInt("Enter your bet amount: ");
                    if (betAmountDeluxe < deluxeSlotMachine.getMininumBet()) {
                        while(true) {
                            console.log("You need to bet a minimum of $3000")
                            betAmountDeluxe =readlineSync.questionInt("Enter your bet amount: ");
                            if (betAmountDeluxe >= deluxeSlotMachine.getMininumBet()) {
                                break;
                            }
                        }
                    }
                    // Get the user's balance from the casino or the `Balance` instance
                    const userBalance = casino.getUserBalance();
                
                    // Validate the bet using the user's balance
                    Casino.validateBet(betAmountDeluxe, userBalance);

                    casino.updateUserBalance(-betAmountDeluxe);
                    const resultDeluxe = deluxeSlotMachine.spinReels(betAmountDeluxe);
                    console.log(resultDeluxe.userWins ? "You win!" : "You lose.");
                    if (resultDeluxe.userWins) {
                        console.log(`You won ${resultDeluxe.bet}`);
                        casino.updateUserBalance(resultDeluxe.bet); // Update user balance
                        casino.updateCasinoBalance(-resultDeluxe.bet); // Update casino balance
                    } else {
                        console.log(`You lost ${resultDeluxe.bet}`);
                        casino.updateUserBalance(-resultDeluxe.bet); // Update user balance
                        casino.updateCasinoBalance(resultDeluxe.bet); // Update casino balance
                    }
                    casino.updateUserBalance(resultDeluxe.bet - betAmountDeluxe);
                }catch (err) {
                    if (err instanceof Error) {
                        console.log(err.message); // Display the error message
                    } else {
                        console.log("An unknown error occurred."); // For any other type of error
                    }
                }
                readlineSync.question("Press Enter to go back...");
                break;                
            case 2:
                console.log("\nSlotMachine Rules:");
                console.log(deluxeSlotMachine.getRules());
                readlineSync.question("Press Enter to go back...");
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
