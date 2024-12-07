import { Games } from "../Models/Games";

export class SlotMachine extends Games {
    // Protected property for the reels, represented as an array of strings
    protected reels: string[] = [];
    // Map to associate symbols with their multiplier values
    protected symbolMultiplier: Map<string, number>;

    constructor() {
        super(
            `Slot Machine Rules:
            - Spin the reels and match symbols to win!
            - Match 3 symbols: Win 3x your bet.
            - Match 2 symbols: Win 2x your bet.`,
            500, // Starting balance
            "" // Initial result message
        );
        this.symbolMultiplier = new Map(); 
    }


    // Method to display the current result of the reels as a formatted string
    public showResult(): string {
        return `| ${this.reels.join(" | ")} |`;
    }
    
    // Method to display the rules of the slot machine game
    public getRules(): string {
        return `
        === Slot Machine Rules ===

        1. Place your bet.
        2. The reels will spin and stop on random symbols.
        3. If you get a winning combination on the payline, you’ll receive a prize based on your bet and the symbol values.

        === Winning Combinations ===

        - Three matching symbols (e.g., 3 hearts) award a prize of x3.
        - Two matching symbols (e.g., 2 hearts) award an additional x2 prize.

        === Prizes ===

        - The prize depends on the bet amount.
        - Each symbol has its own value, which also affects the prize.

        Good luck!`;
    }
}