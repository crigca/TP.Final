import * as readlineSync from "readline-sync";
import { Casino } from "../Models/Casino";
import { Blackjack } from "../Games/Blackjack";

export function showBlackjackMenu(casino: Casino): void {
    const blackjackGame = casino.getGame("blackjack") as Blackjack;
    if (!blackjackGame) {
        console.error("Blackjack game not found.");
        return;
    }

    let exit = false;

    while (!exit) {
        console.clear();
        console.log("\nBlackjack Menu");
        console.log("1. Place a Bet");
        console.log("2. Show Blackjack Rules");
        console.log("3. Return to Main Menu");

        const option = readlineSync.questionInt("Select an option: ");
        
        switch (option) {
        case 1:
            let betAmount = readlineSync.questionInt("Enter your bet amount: ");
            if (betAmount > casino.getUserBalance()) {
                while (true) {
                    console.log("You do not have enough balance to place this bet.")
                    betAmount = readlineSync.questionInt("Enter your bet amount: ");
                    if (betAmount <= casino.getUserBalance()) {
                        break;
                    }
                }
            }
            if (betAmount < blackjackGame.getMinimumBetValue()) {
                while(true) {
                    console.log("You need to bet a minimum of $30")
                    betAmount = readlineSync.questionInt("Enter your bet amount: ");
                    if (betAmount >= blackjackGame.getMinimumBetValue()) {
                        break;
                    }
                }
            }

        
            casino.updateUserBalance(-betAmount); // Deduce bet from user's balance
            const result = blackjackGame.playRound(betAmount);
            
            if (result.userWins) {
                casino.updateUserBalance(betAmount * 2); // Return bet + winnings
                console.log("You win!");
            } else if (result.bet === betAmount) { // Empate
                casino.updateUserBalance(betAmount); // Reembolsar apuesta
                console.log("It's a tie. Your bet has been refunded.");
            } else {
                console.log("You lose.");
            }            
                break;

            case 2:
                console.log("\nBlackjack Rules:");
                console.log(blackjackGame.getRules());
                console.log("\nPress Enter to return to the menu...");
                readlineSync.question();
                break;

            case 3:
                console.log("Returning to Main Menu...");
                exit = true;
                break;

            default:
                console.log("Invalid option. Please try again.");
                readlineSync.question("Press Enter to continue...");
                break;
        }
    }
}