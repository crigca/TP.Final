import * as readlineSync from "readline-sync";
import { Casino } from "../Models/Casino";

// Function to show the balance of the user and the casino
export function showBalanceMenu(casino: Casino): void {
    console.clear();
    console.log("\n=== Balance Menu ===");
    console.log(`Your Balance: $${casino.getUserBalance()}`);
    console.log(`Casino Balance: $${casino.getCasinoBalance()}`);
    readlineSync.question("Press Enter to return to the main menu...");
}
