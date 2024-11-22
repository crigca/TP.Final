export abstract class Games {
  public rules:string;
  public balance:number;
  public msgResult:string;
  public name:string;
  
  constructor(prule:string, pbalance:number, pmsg:string){
    this.rules=prule;
    this.balance=pbalance;
    this.msgResult=pmsg;
    this.name=this.constructor.name.toLowerCase();

  }
  
  public abstract getRules():string;
  public abstract showResult():string;
  
  public getName():string{
    return this.name;
  }
}