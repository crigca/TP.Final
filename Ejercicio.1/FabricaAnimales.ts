import { IAnimal } from "./interfaces/IAnimal";
import { Perro } from "./animales/Perro";
import { Gato } from "./animales/Gato";
import { Pajaro } from "./animales/Pajaro";

// Clase FabricaAnimales para crear instancias de IAnimal segun el tipo e animal.
export class FabricaAnimales {
    crearAnimal(tipo: string, atributos: {raza:string; edad:number; color?: string}): IAnimal {
        if (tipo === "perro") {
            if (!atributos.color) {
                throw new Error ("Falta el atributo color para crear un Perro");
            }
            return new Perro(atributos.raza, atributos.edad, atributos.color);
        }else if (tipo === "gato") {
            return new Gato( atributos.raza, atributos.edad);
        }else if (tipo === "pajaro") {
            return new Pajaro(atributos.raza, atributos.edad)
        }else {
            throw new Error("Tipo de animal no conocido");
        }
    }
}
    
