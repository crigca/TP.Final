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
        3. Si obtienes una combinación ganadora en la línea de pago, recibirás un premio basado en la apuesta y el valor de los símbolos.

        === Combinaciones Ganadoras ===

        - Tres símbolos iguales (por ejemplo: 3 corazones) otorgan un premio x3.
        - Dos símbolos iguales (por ejemplo: 2 corazones) otorgan un premio x2 adicional.

        === Premios ===

        - El premio depende de la apuesta realizada.
        - Cada símbolo tiene su propio valor, lo que también influye en el premio.

        ¡Buena suerte!`
    }
}