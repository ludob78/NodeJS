/**
 * Middleware Controller pour les todos
 * @type {*}
 */

let {Controller}=require('./AbstractController');
let TodoController=new Controller('../service/TodoService');

module.exports=TodoController.getRouter();

// let express = require('express');
// let router = express.Router();
// let todoService = require('../service/TodoService');

//***************************** API REST ***********************************//
/*

router.get('/', (request, response) => {
    todoService.selectAll(function (dbData) {
        response.json(dbData);
        // response.send(dbData);
    });
    // response.send("get All")
});
router.get('/:id', (request, response) => {
    response.send("Get one by id");
    todoService.selectOne(request.body, function (data_retour) {
        response.json(data_retour);
        console.log(data_retour);
    })
});
router.get('/search/:titre', (request, response) => {
    response.send("Get * by titre");
    console.log(request.body);
    todoService.selectByTitre(request.body, function (data_retour) {
        response.json(data_retour);
        console.log(data_retour);
    })
});
router.put('/', (request, response) => {
    // response.send("add task");
    console.log("request.body du controller:",request.body);
    let data=request.body;
    if (request.body.length && request.body.length > 0) {

        todoService.InsertTasks(request.body, function (data_retour) {
            data.id=data_retour.insertId;
            response.json(data);
            console.log(data_retour.affectedRows)
        })
    }else {
        todoService.InsertTask(request.body, function (data_retour) {
            console.log(data_retour.affectedRows);
            console.log("request.body:",request);
            // request.send("ok")
            data.id=data_retour.insertId;
            response.json(data);
        })
    }


});
router.post('/', (request, response) => {

    response.send("update task")
});
router.post('/:id', (request, response) => {

    todoService.updateOne(request.body,function (data_retour) {
        console.log("request.body:",request);
    });
    response.send("update task")
});
let InnerDelete=(idS,response)=>{
    // console.log("id:",idS)
    todoService.DeleteTaskS(idS, function (data_retour) {

        response.send("delete task")
    })
};
router.delete('/', (request, response) => {
    console.log("request.body:",request.body);

    if (request.body.length && request.body.length > 0) {
        //delete many
        let ids=[];
        // console.log("request.body.id:",request.body.id)
        for (let i=0;i<request.body.length;i++){

            ids.push(request.body[i].id);
        }
        console.log("ids:",ids)
        InnerDelete(ids,response);
    } else {
        InnerDelete([request.body.id],response);//on envoit l'id seul dans un tableau pour répondre à la requête delete de la méthode DeleteTaskS

    }

});
/!*

let http = require('http');
let server = require('http').createServer(express());
let io = require("socket.io").listen(server);
io.sockets.on('connection',function (socket) {
    // dbModule.connect;
    socket.on('insert',function (data) {
        console.log(data)
        console.log('Le sujet est:'+data.TITRE+' et la description:'+data.DESCRIPTION)
        // dbModule.query()
        todoService.InsertTask(request.body, function (data_retour) {
            console.log(data_retour.affectedRows)
            console.log("request.body:",request)
            // request.send("ok")
            data.id=data_retour.insertId;
            response.json(data);
        })
    });
});
*!/

module.exports = router;*/
