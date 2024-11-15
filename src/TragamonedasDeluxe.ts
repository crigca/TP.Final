import { IApostar } from "../Interfaces/IApostar";
import { Tragamonedas } from "./Tragamonedas";

export class TragamonedasDeluxe extends Tragamonedas implements IApostar {
    protected simboloMultiplicador: Map<string, number>;
        
    protected rodillos: string[] = []; //4

    constructor() {
        super();
        this.simboloMultiplicador = new Map([
            ["💎", 3],
            ["👑", 2.5],
            ["🏆", 2],
            ["👜", 1.8],
            ["🍾", 1.6],
            ["🚗", 1.4],
            ["🕶️", 1.2],
        ]);
    }

    public girarRodillos(): void {
        const simbolos = Array.from(this.simboloMultiplicador.keys());

        for (let i = 0; i < 4; i++) {
            this.rodillos.push(simbolos[Math.floor(Math.random() * simbolos.length)]);
        }
    }

    public calcularResultado(apuesta:number): {apuesta:number,ganaUsuario:boolean} {
        if (apuesta<0){
            throw new Error("Se le pide que apueste un número mayor a 0(cero)");
            return {apuesta:0,ganaUsuario:false}
        }else{

            let simboloGanador = this.rodillos[0];
            let maxCoincidencias = 1;
    
            for (let i = 0; i < this.rodillos.length; i++) {
                let coincidencias = 1;
                for (let j = i + 1; j < this.rodillos.length; j++) {
                    if (this.rodillos[i] === this.rodillos[j]) {
                        coincidencias++;
                    }
                }
                if (coincidencias > maxCoincidencias) {
                    maxCoincidencias = coincidencias;
                    simboloGanador = this.rodillos[i];
                }
            }
    
            // Aplica el multiplicador según la cantidad de coincidencias
            const multiplicador = this.simboloMultiplicador.get(simboloGanador) || 1;
    
            if (maxCoincidencias === 4) {
                apuesta = apuesta * 4 * multiplicador;
                return{apuesta:apuesta,ganaUsuario:true}
            } else if (maxCoincidencias === 3) {
                apuesta = apuesta * 3 * multiplicador;
                return{apuesta:apuesta,ganaUsuario:true}
            } else if (maxCoincidencias === 2) {
                apuesta = apuesta * 2 * multiplicador;
                return{apuesta:apuesta,ganaUsuario:true}
            }else{
                return{apuesta:apuesta,ganaUsuario:false}
            }
        }
    }
}