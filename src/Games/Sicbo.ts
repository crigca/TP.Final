import { IBet } from "../../Interfaces/IBet";
import { Games } from "../Models/Games";

// Sicbo class extends Games and implements the IBet interface
export class Sicbo extends Games implements IBet {
    private die1: number; // Value of the first die
    private die2: number; // Value of the second die
    private die3: number; // Value of the third die
    private currentDiceSum: number; // Sum of the dice rolled in the current game
    private currentPrediction: number; // User's prediction for an "Exact" bet
    private betType: string; // Type of the bet (e.g., "Small", "Big", "Triple", "Exact")

    // Constructor initializes the Sicbo rules and sets the default values
    constructor() {
        super(
            `SicBo Rules:
        - Small Bet: You win if the sum of the three dice is between 3 and 10, excluding Triples. Payout: 1.2 times the bet.
        - Big Bet: You win if the sum of the three dice is between 11 and 18, excluding Triples. Payout: 1.2 times the bet.
        - Triple Bet: You win if all three dice show the same number (e.g., 3-3-3). Payout: 30 times the bet.
        - Exact Prediction: You win if you guess the exact sum of the three dice. Payout: 5 times the bet.`,
            0, // Initial game balance
            "" // Initial result message
        );
        this.die1 = 0;
        this.die2 = 0;
        this.die3 = 0;
        this.currentDiceSum = 0;
        this.currentPrediction = 0;
        this.betType = "";
    }

    // Returns the values of the three dice rolled
    public getDiceValues(): number[] {
        return [this.die1, this.die2, this.die3];
    }

    // Simulates rolling the dice and calculates their sum
    private rollDice(): number {
        this.die1 = Math.floor(Math.random() * 6) + 1; // Random value between 1 and 6 for die1
        this.die2 = Math.floor(Math.random() * 6) + 1; // Random value between 1 and 6 for die2
        this.die3 = Math.floor(Math.random() * 6) + 1; // Random value between 1 and 6 for die3
        return this.die1 + this.die2 + this.die3; // Sum of all three dice
    }

    // Sets the bet type and prediction (if required for an "Exact" bet)
    setBet(betType: string, prediction?: number): void {
        const validTypes = ["Small", "Big", "Triple", "Exact"];
        if (!validTypes.includes(betType)) {
            throw new Error("Invalid bet type. Choose 'Small', 'Big', 'Triple', or 'Exact'.");
        }
        this.betType = betType;

        if (betType === "Exact" && prediction !== undefined) {
            if (prediction < 3 || prediction > 18) {
                throw new Error("Exact bet prediction must be between 3 and 18.");
            }
            this.currentPrediction = prediction;
        }
    }

    // Calculates the result of the bet and determines if the user wins
    calculateResult(bet: number): { bet: number, userWins: boolean } {
        if (bet <= 0) {
            throw new Error("Bet must be greater than zero.");
        }

        this.currentDiceSum = this.rollDice(); // Roll the dice and calculate the sum
        let userWins = false; // Flag for user win condition

        // Check conditions based on bet type
        if (this.betType === "Small" && this.currentDiceSum >= 3 && this.currentDiceSum <= 10 && !this.isTriple()) {
            userWins = true; // Win condition for Small Bet
        } else if (this.betType === "Big" && this.currentDiceSum >= 11 && this.currentDiceSum <= 18 && !this.isTriple()) {
            userWins = true; // Win condition for Big Bet
        } else if (this.betType === "Triple" && this.isTriple()) {
            userWins = true; // Win condition for Triple Bet
        } else if (this.betType === "Exact" && this.currentDiceSum === this.currentPrediction) {
            userWins = true; // Win condition for Exact Bet
        }

        return { bet, userWins }; // Return the result of the bet
    }

    // Checks if all three dice have the same value (Triple)
    private isTriple(): boolean {
        return this.die1 === this.die2 && this.die2 === this.die3;
    }

    // Returns the rules of the Sicbo game
    public getRules(): string {
        return this.rules;
    }

    // Displays the result message for the current game
    public showResult(): string {
        return this.msgResult;
    }
}
