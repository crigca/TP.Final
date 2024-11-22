export abstract class Plays {
  public rules:string;
  public saldo:number;
  public msgResult:string;
  public name:string;
  
  constructor(prule:string, psaldo:number, pmsg:string){
    this.rules=prule;
    this.saldo=psaldo;
    this.msgResult=pmsg;
    this.name=this.constructor.name.toLowerCase();

  }
  
  public abstract getRules():string;
  public abstract showResult():string;
  
  public getName():string{
    return this.name;
  }
}