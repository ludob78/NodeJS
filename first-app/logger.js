let fileS=require('fs');
const {Console}=require('console');

let logOutput="./outlog.txt";
let errOutput="./errlog.txt";


            let ouput=fileS.createWriteStream(logOutput,{
                flags:'a',
                encoding:'utf8'
            });
            let error=fileS.createWriteStream(errOutput,{
                flags:'a',
                encoding:'utf8'
            });
            // l=new Console(ouput,error);//.log est lié au paramètre output//.error est lié au paramètre error
            // return l;

module.exports=new Console(ouput,error);