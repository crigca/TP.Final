//const { writeFile } = require('fs/promises');
const fs = require('fs');
//console.log(fs);

/**
 *  - fileName:string;
 *  - filePath:string;
 *  - fnFile(sOp:string,s?:string):string 
 *  + load():void
 *  + save(pdata:string):void
 */

export class Files {

  private fileName:string;
  /** path format: "dir_1/dir_2" */
  private filePath:string;

  constructor(pname:string,ppath:string){
    this.fileName=pname;
    /** path format: "dir_1/dir_2" */
    this.filePath="./"+ppath;
  };

/**
 * This method is resposible for to do C.R.U.D. over files.
 * Is called the method of parse data.
 * @param sOp Is an string with the name of operation to do.
 * 
 * @return ERR,OK,NOEX,NOP string
*/
private  fnFile(sOp:string,s?:string):string{
  let res:string="";
  switch (sOp){
    case 'read':
      //console.log(sOp);
      res="ERR";
      //let data = fs.readFileSync(this.fileName,'utf8');
      try {
        let data = fs.readFileSync(this.filePath+"/"+this.fileName, 'utf8');
        res=data;
      } catch (err) {
        console.error(err);
        res="ERR";
      }
      return res;
      break;
    case 'create':
      //console.log(sOp);
      res="OK"
      fs.writeFile(this.filePath+"/"+this.fileName,"",function (err:string) {
        if (err){
          res= "ERR";
          throw err;
        } }
      );
      return res;
      break;
    case 'update':
      //console.log(sOp);
      res="OK"
      fs.writeFile(this.filePath+"/"+this.fileName,s,function (err:string) {
        if (err){
          res= "ERR";
          throw err;
        } }
      );
      return res;
      break;
    case 'delete':
      console.log(sOp);
      break;
    case 'rename':
      console.log(sOp);
      break;
    case 'status':
      //console.log(sOp);
      fs.stat(this.filePath+"/"+this.fileName,(err:string, stats:any) => {
        if (err) {
          console.error(err);
        }
        stats.isFile(); // true
        stats.size; // 1024000 //= 1MB
      });
      break;    
    case 'access':
      //console.log(sOp);
      res="EX";
      fs.access(this.filePath+"/"+this.fileName,fs.constants.F_OK,(err:string) => {
        if (err) {
          console.error(err);
          res="NOEX";
        }
      });
      return res;
      break;  
    default:
      console.log('NOP');
    break;
  }
  return"NOP";
}


/**
 * This method is resposible for load file.
 * @param void.
 * 
 * @return void
*/
public load():void{
  let s:string = fs.fnFile("access");
  /**
   * Search backups
   * case exist: check format, if not then create new:
   * case don't exist: create a new file;
   */
  if(s.localeCompare("NOEX")!=0 && s.localeCompare("NOP")!=0){
    s = fs.fnFile("read");
    if(s.length>0){
      /* unvoid file */
      let j=JSON.parse( s.toString() );
      if (j[0]==undefined)
        /* out format */
        fs.fnFile("create");
    }else
      fs.fnFile("create");
  }else{
    fs.fnFile("create");
  }
}

/**
 * This method is resposible for save data to file.
 * @param pdata :string of JSon.
 * 
 * @return void
*/
public save(pdata:string):void{
  let s:string = fs.fnFile("access");
  /**
   * Search backups
   * case exist: check format, if not then create new:
   * case don't exist: create a new file;
   */
  if(s.localeCompare("NOEX")!=0 && s.localeCompare("NOP")!=0){
    s = fs.fnFile("read");
    if(s.length>0){
      /* unvoid file */
      let j=JSON.parse( s.toString() );
      if (j[0]==undefined){
        /* out format */
        fs.fnFile("create");
      }
    }else
      fs.fnFile("create");
  }else{
    fs.fnFile("create");
  }
  fs.fnFile('update',pdata);
}

}