let http = require('http');//HTTP https://nodejs.org/dist/latest-v8.x/docs/api/http.html
let fs = require('fs');//FileSystem  https://nodejs.org/dist/latest-v8.x/docs/api/fs.html
let loger=require('./logger');
let srv = http.createServer();


loger.log("logger created successfully");
// loger.error("Error detected");

srv.on("request", (request, response) => {
    loger.log("Réception de la request "+request.url);
    // fs.readFile('./first-app/index.html',(err,data)=>{
    if (request.url != "/favicon.ico") {
        fs.readFile('./first-app' + request.url + '.html', (err, data) => {
            loger.log("Réception de la request "+request.url);
            if (err) {
                loger.log("détection error (voir fichier error)"+request.url);
                loger.error(err);//.error est lié au paramètre error
                // response.writeHead(404, {'Content-Type': 'text/html;charset=utf-8','titi':'tutu' });
                //  throw err //arrête le serveur
            }
            else {
                response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8', 'titi': 'tutu'});
                response.end(data);
            }


        })
    }

});

srv.listen(8080);