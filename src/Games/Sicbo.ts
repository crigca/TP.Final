import { IBet } from "../../Interfaces/IBet";

// Sicbo class that implements the IBet interface. Represents the Sicbo game with different types of bets.
export class Sicbo implements IBet {
    private die1: number;
    private die2: number;
    private die3: number;
    private gameBalance: number;
    private rules: string;
    private resultMessage: string;
    private currentBet: number;
    private currentDiceSum: number;
    private currentPrediction: number; // For the sum prediction
    private betType: string; // For the type of bet (Small, Big, Triple, Exact)

    constructor() {
        this.die1 = 0;
        this.die2 = 0;
        this.die3 = 0;
        this.gameBalance = 0;
        this.resultMessage = "";
        this.currentBet = 0;
        this.currentDiceSum = 0;
        this.currentPrediction = 0;
        this.betType = ""; // Initialize the bet type

        // Rules updated with the new win multipliers
        this.rules = `SicBo Rules:
        - Small Bet: You win if the sum of the three dice is between 3 and 10, excluding Triples. Payout: 1.2 times the bet.
        - Big Bet: You win if the sum of the three dice is between 11 and 18, excluding Triples. Payout: 1.2 times the bet.
        - Triple Bet: You win if all three dice show the same number (e.g., 3-3-3). Payout: 30 times the bet.
        - Exact Prediction: You win if you guess the exact sum of the three dice. Payout: 5 times the bet.
        
        --- Note: each type of bet has an associated risk and payout.`;
    }

    // Method to roll three dice and calculate the sum of their results.
    private rollDice(): number {
        this.die1 = Math.floor(Math.random() * 6) + 1;
        this.die2 = Math.floor(Math.random() * 6) + 1;
        this.die3 = Math.floor(Math.random() * 6) + 1;
        return this.die1 + this.die2 + this.die3;
    }

    // Method to set the type of bet and the user's prediction if necessary.
    setBet(betType: string, prediction?: number): void {
        const validTypes = ["Small", "Big", "Triple", "Exact"];
        if (!validTypes.includes(betType)) {
            throw new Error("Invalid bet type. Must be 'Small', 'Big', 'Triple', or 'Exact'.");
        }

        this.betType = betType;

        // Check if the bet is of type Exact and requires a valid prediction
        if (betType === "Exact" && prediction !== undefined) {
            if (prediction < 3 || prediction > 18) {
                throw new Error("The prediction for an Exact bet must be between 3 and 18.");
            }
            this.currentPrediction = prediction;
        } else if (betType === "Exact" && prediction === undefined) {
            throw new Error("You must provide a prediction for an Exact bet.");
        }
    }

    // Method to calculate the result of the bet and determine if the user wins or loses.
    calculateResult(bet: number): { bet: number, userWins: boolean } {
        if (bet <= 0) {
            throw new Error("The bet must be greater than zero.");
        }

        this.currentBet = bet;
        this.currentDiceSum = this.rollDice();

        let userWins = false;

        // Check the winning conditions based on the bet type
        if (this.betType === "Small" && this.currentDiceSum >= 3 && this.currentDiceSum <= 10 && !this.isTriple()) {
            userWins = true;
            this.gameBalance -= bet * 1.2; // Wins 1.2 times the bet
        } else if (this.betType === "Big" && this.currentDiceSum >= 11 && this.currentDiceSum <= 18 && !this.isTriple()) {
            userWins = true;
            this.gameBalance -= bet * 1.2; // Wins 1.2 times the bet
        } else if (this.betType === "Triple" && this.isTriple()) {
            userWins = true;
            this.gameBalance -= bet * 30; // Wins 30 times the bet
        } else if (this.betType === "Exact" && this.currentDiceSum === this.currentPrediction) {
            userWins = true;
            this.gameBalance -= bet * 5; // Wins 5 times the bet
        } else {
            this.gameBalance += bet; // The house keeps the bet
        }

        this.resultMessage = this.showResult();
        return { bet, userWins };
    }

    // Method to check if all three dice have the same value.
    private isTriple(): boolean {
        return this.die1 === this.die2 && this.die2 === this.die3;
    }

    // Method to display a message with the game result.
    showResult(): string {
        return this.resultMessage;
    }
}
