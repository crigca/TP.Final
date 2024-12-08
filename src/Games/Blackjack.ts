import { IBet } from "../../Interfaces/IBet";
import { Games } from "../Models/Games";
import * as readlineSync from "readline-sync";

export class Blackjack extends Games implements IBet {
    private minimumBetValue: number = 30;
    private bet: number = 0;
    private playerCards: number[] = [];
    private houseCards: number[] = [];
    private playerTotal: number = 0;
    private houseTotal: number = 0;

    constructor() {
        super(
            `Blackjack Rules:
            - The player aims to get as close to 21 as possible without exceeding it.
            - The dealer must draw cards until reaching at least 17.
            - Aces can count as 1 or 11.`,
            1000, // Starting balance
            "" // Initial result message
        );
    }

    cleanConsole():void{
        for (let i = 0; i < 15; i++) {
            console.log("")
        }
    }


    // Implement the abstract method to return the rules
    public getRules(): string {
        return this.rules;
    }

    // Implement the abstract method to return the result message
    public showResult(): string {
        return this.msgResult;
    }

    public showCards(): void {
        if (this.houseCards.length > 0) {
            console.log(`The dealer cards: ${this.houseCards}`)
        }
        console.log(`Your Cards: ${this.playerCards}`)
        console.log("=====================")
    }

    public playerShowCards(): void {
        if (this.playerCards.length > 0) {
            console.log(`Your Cards: ${this.playerCards}`)
            console.log("=====================")
        }
    }

    // Method to calculate the result of the game
    public  calculateResult(): { bet: number; userWins: boolean } {
        this.playHouse();

        console.log(`Dealer's total: ${this.houseTotal}`);
        console.log(`Your total: ${this.playerTotal}`);
        console.log("=====================")
        let userWins = false;

        if (
            this.houseTotal > 21 ||
            (this.playerTotal <= 21 && this.playerTotal > this.houseTotal)
        ) {
            this.balance += this.bet * 2; // Win 2x the bet
            userWins = true;
            this.showCards();
            this.msgResult = "Congratulations, you won!";
            console.log(this.msgResult)
            readlineSync.question("Press enter to skip...")
        } else if (this.playerTotal === this.houseTotal) {
            this.balance += this.bet; // Refund the bet}
            this.showCards();
            this.msgResult = "It's a tie."
            console.log(this.msgResult)
            readlineSync.question("Press enter to skip...")
        } else {
            this.balance -= this.bet; // Lose the bet
            this.showCards();
            this.msgResult = "Better luck next time.";
            console.log(this.msgResult)
            readlineSync.question("Press enter to skip...")
        }

        return { bet: this.bet, userWins };
    }

    // Helper methods for the game logic
    public resetGame(): void {
        this.bet = 0;
        this.playerCards = [];
        this.houseCards = [];
        this.playerTotal = 0;
        this.houseTotal = 0;
    }

    public drawCard(player: "player" | "house"): number {
        const card = Math.floor(Math.random() * 10) + 1; // Generate a number between 1 and 10
        if (player === "player") {
            this.playerCards.push(card);
            this.playerTotal += card;
        } else {
            this.houseCards.push(card);
            this.houseTotal += card;
        }
        return card;
    }

    private  playHouse(): void {
        while (this.houseTotal < 17) {
            const card = this.drawCard("house");
        
            // Adjust for Aces (1 or 11)
            if (card === 1 && this.houseTotal + 10 <= 21) {
                this.houseTotal += 10;
            }
        }
    }

    
    // New method to handle a full round of Blackjack
    public playRound(betAmount: number): { userWins: boolean; bet: number } {
        if (betAmount <= 0 ) {
            throw new Error("Bet amount must be greater than zero.");
        }

        this.resetGame(); // Reset the game state
        this.bet = betAmount;
        this.cleanConsole()
        console.log("=====================")
        console.log("=== Your Turn ===");
        while (true) {
            
            console.log("=====================")
            console.log("1. Draw a card");
            console.log("2. Stay");
            console.log("=====================")
            this.playerShowCards()

            const option = readlineSync.questionInt("Choose an option: ");
            if (option === 1) {
                const card = this.drawCard("player");
                console.log("=====================")
                console.log(`You drew a ${card}. Your total is now ${this.playerTotal}`);
                readlineSync.question("Press enter to continue...")
                this.cleanConsole()
                if (this.playerTotal > 21) {
                    this.balance -= this.bet; // Lose the bet
                    console.log("=====================")
                    this.showCards()
                    console.log("Better luck next time. You have lost.")
                    readlineSync.question("Press enter to skip...")
                    console.log(this.showResult());
                    return { userWins: false, bet: 0 }; // Exit if the player loses
                }
            } else if (option === 2) {
                console.log("You chose to stay.");
                break; // We exit the player loop
            } else {
                console.log("Invalid option. Try again.");
            }
        }

        console.log("\n=== Dealer's Turn ===");
        const result = this.calculateResult(); // Calculate the result at the end
        console.log(this.showResult()); // Always print the final result
        return result;
    }

    public getMinimumBetValue():number {
        return this.minimumBetValue;
    }
}    