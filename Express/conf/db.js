var mysql      = require('mysql');
var conf=require('./conf');

// if (conf.env=="dev"){dataBaseManager.connect()}//DEV sinon en production mettre l'ouverture et fermeture de connection dans le service qui appelle la connexion

// module.exports=connection;

let DBManager=class dataBaseManager{
    constructor(){
        this.connection = mysql.createConnection({
            host     : conf.db.server,
            user     : conf.db.user,
            // port     :  conf.db.port,
            password : conf.db.password,
            database : conf.db.database
        });
    }
    query(sql,value,cb){
        this.connection.query(sql,value,cb)
        // console.log(arguments)
    }
    connect(){
        this.connection.connect()//la connection peut être initialisé dans le constructeur pour s'épargner l'appel de la méthode dans les services
    }
    close(){
        this.connection.end()
    }
 }
 module.exports.DBManager=DBManager;//permet d'exporter le constructeur de la class dataBaseManager