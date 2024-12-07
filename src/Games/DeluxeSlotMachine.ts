import { IBet } from "../../Interfaces/IBet";
import { SlotMachine } from "./SlotMachine";

// Deluxe slot machine class inheriting from SlotMachine and implementing the IBet interface
export class DeluxeSlotMachine extends SlotMachine implements IBet {
    // Map to associate symbols with their multiplier values
    protected symbolMultiplier: Map<string, number>;
    // Protected property for the reels, initialized with 4 slots
    protected reels: string[] = [];
    //minimun bet value
    private minimumBetValue: number = 3000;

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

    // Modify the spinReels method to return the result of the bet
    public spinReels(betAmount: number): { userWins: boolean, bet: number } {
        const symbols = Array.from(this.symbolMultiplier.keys());
        this.reels = [];

        for (let i = 0; i < 4; i++) {
            this.reels.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }

        console.log(`Reels: ${this.reels.join(", ")}`);

        let userWins = false;
        let maxMatches = 1;
        let winningSymbol = this.reels[0];

        // Determine the winning symbol and the maximum number of matches
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

        // Check the number of matches and calculate the result
        if (maxMatches === 4) {
            betAmount = betAmount * 4 * multiplier;
            userWins = true;
        } else if (maxMatches === 3) {
            betAmount = betAmount * 3 * multiplier;
            userWins = true;
        } else if (maxMatches === 2) {
            betAmount = betAmount * 2 * multiplier;
            userWins = true;
        }

        return { userWins, bet: betAmount };
    }

    // Method to calculate the result of a bet (already defined, but can be used to refine further)
    public calculateResult(bet: number): { bet: number, userWins: boolean } {
        const result = this.spinReels(bet);  // Using spinReels to calculate the result
        return { bet: result.bet, userWins: result.userWins };
    }

    public getMininumBet(){
        return this.minimumBetValue;
    }
}
