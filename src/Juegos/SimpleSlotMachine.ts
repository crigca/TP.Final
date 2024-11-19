import { IBet } from "../../Interfaces/IBet";
import { SlotMachine } from "./SlotMachine";

// Simple slot machine class inheriting from SlotMachine and implementing the IBet interface
export class SimpleSlotMachine extends SlotMachine implements IBet {
    // Map to associate symbols with their multiplier values
    protected symbolMultiplier: Map<string, number>;

    // Protected property for the reels, initialized with 3 slots
    protected reels: string[] = [];

    constructor() {
        super();
        // Initialize symbol multipliers for simple symbols
        this.symbolMultiplier = new Map([
            ["♦", 3],
            ["♥", 2],
            ["♣", 1.5],
            ["♠", 1.4],
            ["☀️", 1.3],
            ["🌙", 1.2],
            ["⭐", 1.1],
        ]);
    }

    // Method to spin the reels and assign random symbols to them
    public spinReels(): void {
        const symbols = Array.from(this.symbolMultiplier.keys());
        for (let i = 0; i < 3; i++) {
            this.reels.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
    }

    // Method to calculate the result of a bet
    public calculateResult(bet: number): { bet: number, userWins: boolean } {
        // Check if the bet amount is valid
        if (bet < 0) {
            throw new Error("You must place a bet greater than 0 (zero).");
            return { bet: 0, userWins: false };
        }

        // Check for winning combinations
        if (this.reels[0] === this.reels[1] && this.reels[1] === this.reels[2]) {
            // Case: All three symbols match
            const multiplier = this.symbolMultiplier.get(this.reels[0]) || 1;
            bet = bet * 3 * multiplier;
            return { bet: bet, userWins: true };
        } else if (
            this.reels[0] === this.reels[1] || 
            this.reels[1] === this.reels[2] || 
            this.reels[0] === this.reels[2]
        ) {
            // Case: Two symbols match
            const winningSymbol = this.reels[0] === this.reels[1] ? this.reels[0] : this.reels[2];
            const multiplier = this.symbolMultiplier.get(winningSymbol) || 1;
            bet = bet * 2 * multiplier;
            return { bet: bet, userWins: true };
        } else {
            // Case: No matching symbols
            return { bet: bet, userWins: false };
        }
    }
}
