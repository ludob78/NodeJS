let http=require('http');//HTTP https://nodejs.org/dist/latest-v8.x/docs/api/http.html
let m=require('./module');//récup
let srv=http.createServer();
// srv.on('request',function (request,response) {
srv.on('request',(request,response)=>{
    m.execute();//executer un module externe
        console.log(request.url)//affiche l'url
        console.log(request.method)//affiche la method HTTP
        // console.log(request.url.parse(request.url))
    // response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.writeHead(201, {'Content-Type': 'text/html;charset=utf-8' });
    response.write("Serveur en marche");
    var html="<h1>Bienvenue sur le serveur web NODE JS àé</h1>";
    response.write(html);
    response.end();//obligatoire
    });



srv.listen(8080);