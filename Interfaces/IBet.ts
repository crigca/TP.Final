// Interface to define the structure for betting functionality
export interface IBet {
    // Method to calculate the result of a bet
    // Takes the bet amount as input and returns an object with:
    // - The original bet amount
    // - Whether the user wins or not
    calculateResult(bet: number): { bet: number, userWins: boolean };
}