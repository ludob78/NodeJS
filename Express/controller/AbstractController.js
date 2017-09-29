let express = require('express');
class AbstractController {
    constructor(Service) {
        this.router = express.Router();
        this.service = require(Service);
        this.router.delete('/:id', (request, response) => {
            this.service.DeleteTaskS(request.params.id,(dataresultafterservicecalled)=>{
                response.json({});
            } )
        });
        this.router.delete('/', (request, response) => {
            console.log("request from abstract controller:",request.body);
            this.service.DeleteTaskS(request.body,(cb)=>{
                response.json(cb);
            })
        });
        this.router.get('/', (request, response) => {
            this.service.selectAll((cb)=>{
                console.log(cb);
                response.json(cb);
            })

        });
        this.router.get('/:id', (request, response) => {
            this.service.selectOne(request.params.id, (dataresultafterservicecalled) => {
             response.json(dataresultafterservicecalled)
                console.log(dataresultafterservicecalled)
            })
        });
        this.router.get('/searchbyinput/:input', (request, response) => {
            // console.log(request.params);
            this.service.selectByInput(request.params.input, (dataresultafterservicecalled) => {
                console.log(dataresultafterservicecalled);
                response.json(dataresultafterservicecalled);
            })
        });

        this.router.post('/',(request,response)=>{
            console.log("abstract post request:",request.body);
            let data = request.body;
            this.service.updateOne(request.body,(dataresultafterservicecalled)=>{
                data.id = dataresultafterservicecalled.insertId
                console.log(dataresultafterservicecalled);
               // response.json(dataresultafterservicecalled);
                response.json(data);
            })
            // console.log(request.body);
            // this.service.InsertTasks(request.body)
        });
        this.router.put('/', (request, response) => {
            let data = request.body;
            this.service.InsertTasks(request.body,(dataresultafterservicecalled)=>{
                data.id = dataresultafterservicecalled.insertId
                // console.log(dataresultafterservicecalled)
                response.json(data);
               // response.json({});
            })
        });
    }
    getService(){
        return this.service;
    }
    getRouter() {
        return this.router;
    }
}
module.exports.Controller = AbstractController;