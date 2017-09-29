let {DBManager} = require('../conf/db');//C'est la classe qui est exporté ici et on appel son constructeur /
let mysql = require('mysql');

class UserService{
    static selectAll(callback) {
        let dbModule=new DBManager();
        dbModule.connect();
        dbModule.query("select * from users;", function (error, rows) {
            callback(rows)
        });
        dbModule.close()
    }

    static selectOne(requestId, callback) {
        let dbModule=new DBManager();
        dbModule.connect();
        dbModule.query("select * from users where id=?;", [requestId.ID], function (error, SelectedResults) {
            // dbModule.connect();//mode PROD pour optimisation des sessions sql
            if (error) {
                throw error;
            }
            // dbModule.close();//mode PROD pour optimisation des sessions sql
            callback(SelectedResults);
        });
        dbModule.close()
    }

    static InsertTask(dataToInsert, callback) {
        // console.log("dataToInsert:", dataToInsert)
        let dbModule=new DBManager();
        dbModule.connect();
        dbModule.query("insert into users (email,password) values(?,?);", [dataToInsert.titre, dataToInsert.description], function (error, insertResults) {
            if (error) {
                throw error;
            }
            callback(insertResults);
        })
        dbModule.close()
    }

    static InsertTasks(dataToInsert, callback) {
        let dbModule=new DBManager();
        dbModule.connect();
        let sqlStr = [];
        for (let i = 0; i < dataToInsert.length; i++) {
            let str = mysql.format("(?,?)", [dataToInsert[i].title, dataToInsert[i].description]);
            sqlStr.push(str);
        }
        console.log("sqlStr:", sqlStr);
        // let sqlStr=[;]
        dbModule.query("insert into users (email,password) values " + sqlStr.join(' , ') + ";", function (error, insertResults) {
            if (error) {
                throw error;
            }
            callback(insertResults);
        });
        dbModule.close()
    }

    static DeleteTaskS(IdToDelete, callback) {
        let dbModule=new DBManager();
        dbModule.connect();
        console.log("IdToDelete:", IdToDelete);
        console.log("[IdToDelete]:", [IdToDelete]);
        dbModule.query("delete from users where ID in (?);", [IdToDelete], function (error, DeleteResults) {
            if (error) {
                throw error;
            }
            callback(DeleteResults);
        });
        dbModule.close()
    }
    static login(data,callback){
        console.log("data:",data);
        let dbModule=new DBManager();
        dbModule.connect();
        dbModule.query("select count(*) as count from users where email=? and password=?;", [data.email,data.password], function (error, SelectedResults) {
          console.log("SelectedResults:",SelectedResults[0].count);
            // dbModule.connect();//mode PROD pour optimisation des sessions sql
            if (error) {
                console.log( error);
            }
            // dbModule.close();//mode PROD pour optimisation des sessions sql
            callback(SelectedResults[0].count);
        });
        dbModule.close();
        // callback(true);
    }
    static register(data,callback){
        console.log("data:",data);
        let dbModule=new DBManager();
        dbModule.connect();
        dbModule.query("insert into users (email,password)values (?,?);", [data.email,data.password], function (error, InsertResults) {
            // console.log("SelectedResults:",SelectedResults[0].count);
            // dbModule.connect();//mode PROD pour optimisation des sessions sql
            if (error) {
                console.log( error);
            }
            // dbModule.close();//mode PROD pour optimisation des sessions sql
            callback(InsertResults);
        });
        dbModule.close();
        // callback(true);
    }
}
module.exports=UserService;