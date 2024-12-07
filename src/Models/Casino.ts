import { GameManager } from "./GameManager";
import { Balance } from "./Balance";
import * as fs from "fs";

export class Casino {
    private static instance: Casino;
    private gameManager: GameManager | null = null;
    private balance: Balance | null = null;

    private constructor() {
        // Singleton constructor
    }

    // Get the singleton instance
    public static getInstance(): Casino {
        if (!Casino.instance) {
            Casino.instance = new Casino();
        }
        return Casino.instance;
    }

    // Set GameManager instance
    public setGameManager(manager: GameManager): void {
        this.gameManager = manager;
    }

    // Get GameManager instance
    public getGameManager(): GameManager {
        this.ensureGameManagerInitialized();
        return this.gameManager!;
    }

    // Set Balance instance - Load from file if it exists, otherwise use default values
    public setBalance(balance: Balance): void {
        this.balance = balance;
        const balanceFile = "Data/balance.txt";
        if (fs.existsSync(balanceFile)) {
            // If the balance.txt file exists, load the values from the file
            this.balance = Balance.fromFile(); // Load balance from the file
        } else {
            // If it does not exist, use default values
            this.balance = new Balance(); // Default values: $50,000 for the user and $1,000,000 for the casino
        }
    }

    // Get the user's balance
    public getUserBalance(): number {
        this.ensureBalanceInitialized();
        return this.balance!.getUserBalance();
    }

    // Get the casino's balance
    public getCasinoBalance(): number {
        this.ensureBalanceInitialized();
        return this.balance!.getCasinoBalance();
    }

    // Update the user's balance
    public updateUserBalance(amount: number): void {
        this.ensureBalanceInitialized();
        this.balance!.setUserBalance(amount);
    }

    // Update the casino's balance
    public updateCasinoBalance(amount: number): void {
        this.ensureBalanceInitialized();
        this.balance!.setCasinoBalance(amount);
    }

    // Check if the game is over
    public checkGameOver(): { gameOver: boolean; winner: string } {
        this.ensureBalanceInitialized();
        return this.balance!.checkGameOver();
    }

    // Save balances to text files (balance.txt)
    public saveBalances(): void {
        this.ensureBalanceInitialized();
        this.balance!.saveBalanceTxt();  // Save the balance.txt file when the game ends
    }

    // List all available games
    public listAvailableGames(): string[] {
        this.ensureGameManagerInitialized();
        return this.gameManager!.listGames();
    }

    // Get a specific game by name
    public getGame(gameName: string) {
        this.ensureGameManagerInitialized();
        return this.gameManager!.getGame(gameName);
    }

    // Private method to ensure Balance is initialized
    private ensureBalanceInitialized(): void {
        if (!this.balance) {
            throw new Error("Balance is not initialized.");
        }
    }

    // Private method to ensure GameManager is initialized
    private ensureGameManagerInitialized(): void {
        if (!this.gameManager) {
            throw new Error("GameManager is not initialized.");
        }
    }

    public static validateBet(betAmount: number, userBalance: number): void {
        if (betAmount <= 0) {
            throw new Error("The bet must be greater than zero.");
        }
        if (betAmount > userBalance) {
            throw new Error("The bet cannot exceed the user's balance.");
        }
    }
}
