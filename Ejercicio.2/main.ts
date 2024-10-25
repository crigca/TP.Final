import { ComputadoraBuilder } from "./ComputadoraBuilder";


function main() {
    //Crear la primer computadora con todos los atributos
    const computadora_1 = new ComputadoraBuilder()
     .setProcesador ("AMD Ryzen 5")
     .setRam ("8 GB")
     .setAlmacenamiento ("512GB SSD")
     .setTarjetaGrafica ("AMD Radeon RX 5600")
     .setSistemaOperativo ("Windows 10")
     .build();

     //Mostrar detalles de la primer computadora
     console.log("       Computadora 1:");
     console.log(computadora_1.obtenerDetalles());
     console.log("------------------");

     //Crear la segunda computadora con algunos atributos
     const computadora_2 = new ComputadoraBuilder()
     .setProcesador("Intel Core i5")
     .setRam("16 GB")
     .setAlmacenamiento("1TB HDD")
     .build();

     //Mostrar detalles de la segunda computadora
     console.log("       Computadora 2:");
     console.log(computadora_2.obtenerDetalles());
}

main();