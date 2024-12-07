import * as readlineSync from "readline-sync";
import { Casino } from "../Models/Casino";
import { SimpleSlotMachine } from "../Games/SimpleSlotMachine";

export function showSimpleSlotMachinesMenu(casino: Casino): void {
    const simpleSlotMachine = casino.getGame("simpleSlotMachine") as SimpleSlotMachine;
    let exit = false;

    while (!exit) {
        console.clear();
        console.log("\nSimple Slot Machines Menu");
        console.log("1. Play Simple SlotMachine");
        console.log("2. Show SlotMachine Rules");
        console.log("3. Exit");

        const option = readlineSync.questionInt("Select an option: ");

        switch (option) {
            case 1:
                try {
                    let betAmountSimple = readlineSync.questionInt("Enter your bet amount: ");
                    if (betAmountSimple < simpleSlotMachine.getMininumBet()) {
                        while(true) {
                            console.log("You need to bet a minimum of $300")
                            betAmountSimple =readlineSync.questionInt("Enter your bet amount: ");
                            if (betAmountSimple >= simpleSlotMachine.getMininumBet()) {
                                break;
                            }
                        }
                    }
                    
                    // Get the user's balance from the casino or the `Balance` instance
                    const userBalance = casino.getUserBalance();
                
                    // Validate the bet using the user's balance
                    Casino.validateBet(betAmountSimple, userBalance);
                
                    // Continue with the game flow
                    casino.updateUserBalance(-betAmountSimple);
                    const resultSimple = simpleSlotMachine.spinReels(betAmountSimple);
                    console.log(resultSimple.userWins ? "You win!" : "You lose.");
                    //update user balance
                    if (resultSimple.userWins) {
                        console.log(`You won ${resultSimple.bet}`);
                        casino.updateUserBalance(resultSimple.bet);
                        casino.updateCasinoBalance(-resultSimple.bet);
                    } else {
                        console.log(`You lost ${betAmountSimple}`);
                        casino.updateCasinoBalance(betAmountSimple);
                    }
                } catch (err) {
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
                console.log(simpleSlotMachine.getRules());
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
