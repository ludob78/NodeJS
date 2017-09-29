let {DBManager} = require('../conf/db');//C'est la classe qui est exporté ici et on appel son constructeur /
let mysql = require('mysql');
class TodoService {
    static selectAll(callback) {
        let dbModule = new DBManager();
        dbModule.connect();
        dbModule.query("select * from todo;", function (error, rows) {
            callback(rows)
        });
        dbModule.close()
    }

    static selectOne(requestId, callback) {
        let dbModule = new DBManager();
        dbModule.connect();
        dbModule.query("select * from todo where id=?;", [requestId.id], function (error, SelectedResults) {
            // dbModule.connect();//mode PROD pour optimisation des sessions sql
            if (error) {
                throw error;
            }
            // dbModule.close();//mode PROD pour optimisation des sessions sql
            callback(SelectedResults);
        });
        dbModule.close()
    }

    static selectByInput(input, callback) {
        let dbModule = new DBManager();
        dbModule.connect();
        dbModule.query("select * from todo where titre like ? or description like ?;", ["%" + input + "%", "%" + input + "%"], function (error, SelectedResults) {
            // dbModule.connect();//mode PROD pour optimisation des sessions sql
            if (error) {
                throw error;
            }
            // dbModule.close();//mode PROD pour optimisation des sessions sql
            callback(SelectedResults);
        });
        dbModule.close();
    }

    static updateOne(data, callback) {
        console.log("service update One data:",data.titre," ", data.description," ", data.id);
        let dbModule = new DBManager();
        dbModule.connect();
        dbModule.query("update todo set titre=?,description=?  where id=?;", [data.titre, data.description, data.id], function (error, SelectedResults) {
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
        console.log("dataToInsert:", dataToInsert);
        let dbModule = new DBManager();
        dbModule.connect();
        dbModule.query("insert into todo (titre,description) values(?,?);", [dataToInsert.titre, dataToInsert.description], function (error, insertResults) {
            if (error) {
                throw error;
            }
            callback(insertResults);
        });
        dbModule.close()
    }

    static InsertTasks(dataToInsert, callback) {
        console.log("dataToInsert:", dataToInsert);
        console.log("dataToInsert.length:", dataToInsert.length);
        let dbModule = new DBManager();
        dbModule.connect();
        let sqlStr = [];
        if (dataToInsert.length > 0) {
            for (let i = 0; i < dataToInsert.length; i++) {
                let str = mysql.format("(?,?)", [dataToInsert[i].titre, dataToInsert[i].description]);
                console.log(str);
                sqlStr.push(str);
            }
        }else {
            let str = mysql.format("(?,?)", [dataToInsert.titre, dataToInsert.description]);
            console.log(str);
            sqlStr.push(str);
        }
        console.log("sqlStr:", sqlStr);
        // let sqlStr=[;]
        dbModule.query("insert into todo (titre,description) values " + sqlStr.join(' , ') + ";", function (error, insertResults) {
            if (error) {
                throw error;
            }
            callback(insertResults);
        });
        dbModule.close()
    }

    static DeleteTaskS(IdToDelete, callback) {
        let dbModule = new DBManager();
        dbModule.connect();
        console.log("IdToDelete:", IdToDelete);
        console.log("[IdToDelete]:", [IdToDelete]);
        dbModule.query("delete from todo where id in (?);", [IdToDelete.id], function (error, DeleteResults) {
            if (error) {
                throw error;
            }
            callback(DeleteResults);
        });
        dbModule.close()
    }
}
module.exports = TodoService;