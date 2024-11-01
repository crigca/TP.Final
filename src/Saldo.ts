export class Saldo{
    private saldo:number=0;

    private constructor(){};

    setSaldo(monto:number):string{
        if (monto<0){
            throw new Error("Por favor no ingrese un número negativo");
        }else{
            this.saldo+=monto;
            return `Usted ha ingresado $${monto}, su saldo actual es de $${this.saldo}`
        }
    }
    
    getSaldo():string{
        return `Su saldo actual es de $${this.saldo}`;
    }

    retirarSaldo(monto:number):string{
        if(this.saldo < monto){
            return `Usted no puede retirar más saldo del que posee`;
        }else{
            this.saldo-=monto;
            return `Usted ha retirado $${monto}, su saldo actual es de $${this.saldo}`;
        }
    }
}