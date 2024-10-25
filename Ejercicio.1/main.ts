import { Perro } from "./animales/Perro";
import { FabricaAnimales } from "./FabricaAnimales";
import { IAnimal } from "./interfaces/IAnimal";

function main() {
    //Crear una instancia de la fabrica
    const fabrica = new FabricaAnimales();

    //Array con los tipos de animales y sus atributos
    const animales: {tipo: string; atributos: {raza: string; edad: number; color?: string} }[] = [
        {tipo: "perro", atributos: {raza: "Labrador", edad: 5, color: "negro"}},
        {tipo: "gato", atributos: {raza: "Siames", edad: 3}},
        {tipo: "pajaro", atributos: {raza: "canario", edad: 1}},
    ];

    //Iterar el array y crear instancias
    animales.forEach((animalDatos) => {
        try {
            const animal: IAnimal = fabrica.crearAnimal(animalDatos.tipo, animalDatos.atributos);

            console.log(`Animal: ${animalDatos.tipo}`);
            console.log("Sonido:", animal.hacerSonido());
            console.log("Movimiento:", animal.mover());
           
            if(animalDatos.tipo === "perro") {
                const perro = animal as Perro;
                console.log(`Color: ${perro[`color`]}`);
            }

            console.log("Detalles:", animal.toString());
            console.log("-----------------");
        }catch (error) {
            console.error("Error al crear el animal:",(error as Error).message);
        }       
    });
}

//Ejecutar la funcion
main();