import { Menu } from "./Menu";

export class MenuBuilder {
    public entrada?: string;
    public platoPrincipal?: string;
    public postre?: string;
    public bebida?: string;

    // Metodos para configurar cada atributo y devolver el builder
    public setEntrada(entrada: string): MenuBuilder {
        this.entrada = entrada;
        return this;
    }

    public setPlatoPrincipal(platoPrincipal: string): MenuBuilder {
        this.platoPrincipal = platoPrincipal;
        return this;
    }

    public setPostre(postre: string): MenuBuilder {
        this.postre = postre;
        return this;
    }

    public setBebida(bebida: string): MenuBuilder {
        this.bebida = bebida;
        return this;
    }

    // Metodo para crear una instancia
    public build(): Menu {
        return new Menu(this);
    }
}
