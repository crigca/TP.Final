// import {Juegos} from "./Juegos.ts";
export class Tragamonedas {
    protected rodillos: string[] = [];
    protected simboloMultiplicador:Map <string, number>;

    public mostrarResultado(): string {
        return `| ${this.rodillos.join(" | ")} |`;
    }
    
    public getReglas():string{
        return `
        === Reglas de las Tragaperras ===
        
        1. Introduce tu apuesta.
        2. Los rodillos girarán y se detendrán en símbolos aleatorios.
        3. Si obtienes una combinación ganadora en la línea de pago, recibirás un premio basado en la apuesta.
        
        === Combinaciones Ganadoras ===
        
        - Tres símbolos iguales(por ejemplo: 3 corazones) otorgan un premio x3.
        - Dos símbolos iguales(por ejemplo: 2 corazones) otorgan un premio x2.
        
        === Premios ===
        
        - El premio depende de la apuesta realizada.
        
        ¡Buena suerte!`
    }
}