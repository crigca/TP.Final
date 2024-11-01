import { IApostar } from "../Interfaces/IApostar";

export abstract class Tragamonedas implements IApostar{
    private valorMinimoApuesta:number;

    public abstract apostar(apuesta:number):string;

    public getReglas():string{
        return `
        === Reglas de las Tragaperras ===
        
        1. Introduce tu apuesta.
        2. Los rodillos girarán y se detendrán en símbolos aleatorios.
        3. Si obtienes una combinación ganadora en la línea de pago, recibirás un premio basado en la apuesta y el valor de los símbolos.
        
        === Combinaciones Ganadoras ===
        
        - Tres símbolos iguales en la línea de pago principal (por ejemplo: 3 cerezas) otorgan un premio.
        - Combinaciones específicas de símbolos (por ejemplo: 3 números "7") pueden otorgar premios mayores.
        
        === Premios ===
        
        - El premio depende del tipo de símbolo y la apuesta realizada.
        
        ¡Buena suerte!`
    }
}