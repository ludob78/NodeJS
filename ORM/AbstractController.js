//sequelize (http://docs.sequelizejs.com/manual/installation/getting-started.html)
let express = require('express');
class AbstractController {
    constructor(model) {
        this.router = express.Router();
        this.model = model;
        this.router.delete('/:id', (request, response) => {

        });
        this.router.delete('/', (request, response) => {

        });
        this.router.get('/', (request, response) => {
            this.model.findAll({where:{id:1,lastName:{$like:"%Hancock"}}}).then((users)=>{
                response.json(users)
            })
        });
        this.router.get('/:id', (request, response) => {

        });
        this.router.get('/search/:titre', (request, response) => {

        });
        this.router.post('/',(request,response)=>{

        });
        this.router.put('/', (request, response) => {

        });
    }
    getModel(){
        return this.model;
    }
    getRouter() {
        return this.router;
    }
}
module.exports.Controller = AbstractController;