import { IApostar } from "../Interfaces/IApostar";
import { Tragamonedas } from "./Tragamonedas";

export class TragamonedasSimple extends Tragamonedas implements IApostar{
    protected simboloMultiplicador:Map <string, number>;
    

    protected rodillos: string[] = []; //4

    constructor() {
        super();
        this.simboloMultiplicador = new Map([
            ["♦", 3],
            ["♥", 2],
            ["♣", 1.5],
            ["♠", 1.4],
            ["☀️", 1.3],
            ["🌙", 1.2],
            ["⭐", 1.1],
        ]);
    }

    public girarRodillos(): void {
        const simbolos = Array.from(this.simboloMultiplicador.keys());
        for (let i = 0; i < 3; i++) {
            this.rodillos.push(simbolos[Math.floor(Math.random() * simbolos.length)]);
        }
    }    

    public calcularResultado(apuesta:number): {apuesta:number,ganaUsuario:boolean}{
        if(apuesta<0){
            throw new Error("Se le pide que apueste un número mayor a 0(cero)");
            return {apuesta:0,ganaUsuario:false}
        }

        if (this.rodillos[0] === this.rodillos[1] && this.rodillos[1] === this.rodillos[2]) {
            let multiplicador = this.simboloMultiplicador.get(this.rodillos[0]) || 1;
            apuesta = apuesta * 3 * multiplicador;
            return{apuesta:apuesta,ganaUsuario:true}
        } else if (this.rodillos[0] === this.rodillos[1] || this.rodillos[1] === this.rodillos[2] || this.rodillos[0] === this.rodillos[2]) {

            let simboloGanador = this.rodillos[0] === this.rodillos[1] ? this.rodillos[0] : this.rodillos[2];
            let multiplicador = this.simboloMultiplicador.get(simboloGanador) || 1;

            apuesta = apuesta * 2 * multiplicador;
            return{apuesta:apuesta,ganaUsuario:true}
        } else{
            return{apuesta:apuesta,ganaUsuario:false}
        }
    }
    
}