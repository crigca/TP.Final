import * as fs from "fs";

export class Balance {
    private balance: number;

    constructor(balance: number){
        this.balance = balance
    }

    public getSUserBalance() :number{
        return this.balance;
    }

    public setUserBalance(amount: number):void{
        this.balance += amount
    }

    public saveBalanceTxt(): void {
        const fileName = "userBalance.txt";
        const content = `Balance: ${this.balance}`;
        fs.writeFileSync(fileName, content, "utf-8");
        console.log(`Balance guardado en el archivo: ${fileName}`);
    }
}