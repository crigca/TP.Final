import { IApostar } from "../Interfaces/IApostar";

export abstract class Tragamonedas implements IApostar{
    protected valorMinimoApuesta:number;
    protected simbolos:string[];
    protected simboloMultiplicador:Map <string, number>;
    protected ganancia:number;
    protected apuesta:number=0;

    getValorMinimoApuesta():number{
        return this.valorMinimoApuesta
    }

    public apostar(apuesta:number):string{
        if(apuesta<this.valorMinimoApuesta){
            return `El valor minimo de apuesta de este juego es ${this.valorMinimoApuesta}, por favor apuesta más.`
        }else{
            this.apuesta=apuesta;
            return `Usted ha apostado $${apuesta} en la tragamoneda.`
        }
    }

    abstract calcularResultado():void;

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