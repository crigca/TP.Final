import { MenuBuilder } from "./MenuBuilder";

function main() {
    // Crear un menú con entrada, plato principal y bebida
    const menu_1 = new MenuBuilder()
        .setEntrada("Ensalada Cesar")
        .setPlatoPrincipal("Pastas rellenas")
        .setBebida("Jugo de naranja")
        .build();

    console.log("Detalles del Menu 1:");
    console.log(menu_1.mostrarDetalles());
    console.log("----------------------------");

    // Crear otro menú solo con plato principal y postre
    const menu_2 = new MenuBuilder()
        .setPlatoPrincipal("Hamburguesa con queso")
        .setPostre("Brownie")
        .build();

    console.log("Detalles del Menu 2:");
    console.log(menu_2.mostrarDetalles());
}

main();
