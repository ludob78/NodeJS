/**
 * Middleware Controller pour les todos
 * @type {*}
 */

let { Controller } = require('./AbstractController');
let UserControl = new Controller('../service/UserService');

UserControl.getRouter().put('/login',(request,response)=>{

    console.log(request.body);
    UserControl.getService().login(request.body,function(result) {

        console.log('result:',result);
        if (result>0){
            request.session.user={
                login:request.body.email,
                password:request.body.password
            };

            response.send('connexion ok')
        }else {


            response.send('pas de connexion')
        }
        console.log("request.session.user:",request.session.user)
    });


});

UserControl.getRouter().put('/register',(request,response)=>{
    UserControl.getService().register(request.body,function (result) {
        console.log('result:',result);
        if (result>0){
            request.session.user={
                login:request.body.email,
                password:request.body.password
            };

            response.send('Enregistrement ok')
        }else {


            response.send('Pas d\'enregistrement')
        }
        console.log("request.session.user:",request.session.user)
    })

});
module.exports = UserControl.getRouter();