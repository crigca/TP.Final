import * as fs from "fs";

export class Balance {
    private userBalance: number;
    private casinoBalance: number;

    // Initial balance values for user and casino
    private static readonly INITIAL_USER_BALANCE = 50000;
    private static readonly INITIAL_CASINO_BALANCE = 1000000;

    constructor(userBalance: number = Balance.INITIAL_USER_BALANCE, casinoBalance: number = Balance.INITIAL_CASINO_BALANCE) {
        // Ensure balances are non-negative
        this.userBalance = Math.max(0, userBalance);
        this.casinoBalance = Math.max(0, casinoBalance);
    }

    // Load balances from balance.txt
    public static fromFile(): Balance {
        const balanceFile = "Data/balance.txt";
        try {
            const data = fs.readFileSync(balanceFile, "utf-8");
            const lines = data.split("\n");
            const userBalance = parseFloat(lines[0].replace("User Balance: $", ""));
            const casinoBalance = parseFloat(lines[1].replace("Casino Balance: $", ""));
            return new Balance(userBalance, casinoBalance);
        } catch (error) {
            console.log("Failed to read the balance file, using default balance.");
            return new Balance(); // Use default values if file does not exist
        }
    }

    // Get the user's balance
    public getUserBalance(): number {
        return this.userBalance;
    }

    // Update the user's balance
    public setUserBalance(amount: number): void {
        if (this.userBalance + amount < 0) {
            throw new Error("User balance cannot go below zero.");
        }
        this.userBalance += amount;
    }

    // Get the casino's balance
    public getCasinoBalance(): number {
        return this.casinoBalance;
    }

    // Update the casino's balance
    public setCasinoBalance(amount: number): void {
        if (this.casinoBalance + amount < 0) {
            throw new Error("Casino balance cannot go below zero.");
        }
        this.casinoBalance += amount;
    }

    // Save the current balance to balance.txt
    public saveBalanceTxt(): void {
        const balanceFile = "Data/balance.txt"; // Save to balance.txt

        const balanceData = `User Balance: $${this.userBalance}\nCasino Balance: $${this.casinoBalance}`;
        fs.writeFileSync(balanceFile, balanceData, "utf-8");

        console.log(`Balances saved`);
    }

    // Check if the game is over (if either balance reaches zero)
    public checkGameOver(): { gameOver: boolean; winner: string } {
        if (this.userBalance <= 0) {
            console.log("Game Over! The casino wins.");
            this.saveBalanceTxt(); // Save final state before exiting
            process.exit(); // Exit game if user loses
        }
        if (this.casinoBalance <= 0) {
            console.log("Game Over! The user wins.");
            this.saveBalanceTxt(); // Save final state before exiting
            process.exit(); // Exit game if casino loses
        }
        return { gameOver: false, winner: "" };
    }
}