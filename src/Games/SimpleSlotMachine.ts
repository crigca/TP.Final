import { IBet } from "../../Interfaces/IBet";
import { SlotMachine } from "./SlotMachine";

// Simple slot machine class inheriting from SlotMachine and implementing the IBet interface
export class SimpleSlotMachine extends SlotMachine implements IBet {
    // Map to associate symbols with their multiplier values
    protected symbolMultiplier: Map<string, number>;

    // Protected property for the reels, initialized with 3 slots
    protected reels: string[] = [];

    //minimun bet value
    private minimumBetValue: number = 300;

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

    // Modify the spinReels method to return the result of the bet
    public spinReels(betAmount: number): { userWins: boolean, bet: number } {
        const symbols = Array.from(this.symbolMultiplier.keys());
        this.reels = [];

        for (let i = 0; i < 3; i++) {
            this.reels.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }

        console.log(`Reels: ${this.reels.join(", ")}`);

        let userWins = false;
        let multiplier = 1;

        // Check for winning combinations
        if (this.reels[0] === this.reels[1] && this.reels[1] === this.reels[2]) {
            // Case: All three symbols match
            multiplier = this.symbolMultiplier.get(this.reels[0]) || 1;
            userWins = true;
            betAmount = betAmount * 3 * multiplier;
        } else if (
            this.reels[0] === this.reels[1] || 
            this.reels[1] === this.reels[2] || 
            this.reels[0] === this.reels[2]
        ) {
            // Case: Two symbols match
            const winningSymbol = this.reels[0] === this.reels[1] ? this.reels[0] : this.reels[2];
            multiplier = this.symbolMultiplier.get(winningSymbol) || 1;
            userWins = true;
            betAmount = betAmount * 2 * multiplier;
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
