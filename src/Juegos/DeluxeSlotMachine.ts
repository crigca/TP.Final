import { IBet } from "../../Interfaces/IBet";
import { SlotMachine } from "./SlotMachine";

// Deluxe slot machine class inheriting from SlotMachine and implementing the IBet interface
export class DeluxeSlotMachine extends SlotMachine implements IBet {
    // Map to associate symbols with their multiplier values
    protected symbolMultiplier: Map<string, number>;
    // Protected property for the reels, initialized with 4 slots
    protected reels: string[] = [];

    constructor() {
        super();
        // Initialize symbol multipliers for deluxe symbols
        this.symbolMultiplier = new Map([
            ["💎", 3],
            ["👑", 2.5],
            ["🏆", 2],
            ["👜", 1.8],
            ["🍾", 1.6],
            ["🚗", 1.4],
            ["🕶️", 1.2],
        ]);
    }

    // Method to spin the reels and assign random symbols to them
    public spinReels(): void {
        const symbols = Array.from(this.symbolMultiplier.keys());

        for (let i = 0; i < 4; i++) {
            this.reels.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
    }

    // Method to calculate the result of a bet
    public calculateResult(bet: number): { bet: number, userWins: boolean } {
        // Check if the bet amount is valid
        if (bet < 0) {
            return { bet: 0, userWins: false };
        } else {
            // Determine the winning symbol and the maximum number of matches
            let winningSymbol = this.reels[0];
            let maxMatches = 1;

            for (let i = 0; i < this.reels.length; i++) {
                let matches = 1;
                for (let j = i + 1; j < this.reels.length; j++) {
                    if (this.reels[i] === this.reels[j]) {
                        matches++;
                    }
                }
                if (matches > maxMatches) {
                    maxMatches = matches;
                    winningSymbol = this.reels[i];
                }
            }

            // Apply the multiplier based on the number of matches
            const multiplier = this.symbolMultiplier.get(winningSymbol) || 1;

            if (maxMatches === 4) {
                bet = bet * 4 * multiplier;
                return { bet: bet, userWins: true };
            } else if (maxMatches === 3) {
                bet = bet * 3 * multiplier;
                return { bet: bet, userWins: true };
            } else if (maxMatches === 2) {
                bet = bet * 2 * multiplier;
                return { bet: bet, userWins: true };
            } else {
                return { bet: bet, userWins: false };
            }
        }
    }
}
