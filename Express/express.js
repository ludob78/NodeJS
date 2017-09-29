// let privatise la variable ou fonction au fichier courant
let express=require('express');
let app=express();
let fs = require('fs');//FileSystem  https://nodejs.org/dist/latest-v8.x/docs/api/fs.html
let bodyParser=require('body-parser');
let todo=require('./controller/TodoController');
let user=require('./controller/UserController');
// let User
let session=require('express-session');
let Cors=require('cors');
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'Miam les burgers',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge: 60000 },
}));


//Déclarer le module de templating Embedded JS (npm install ejs --save) docs:http://ejs.co/
app.set('view engine','ejs');

app.use(Cors());
//Déclaration du répertoire des statics
app.use('/static',express.static("assets"));//définit un chemin static au répertoire des assets
// app.use('/socket',express.static("node_modules/socket.io-client"));//définit un chemin static au répertoire de socket.io dans les modules
app.use('/jquery',express.static("node_modules/jquery"));//définit un chemin static au répertoire de jquery dans les modules
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//Déclaration des middleware (Controller)
app.use('/todo',todo);
app.use('/user',user);



app.get('/login',(request,response)=>{
    console.log(request.url);
    // request.session.test='test session';
    // console.log(request.session.test)
    fs.readFile('assets/login.html',(err,data)=>{
        if (err){
            throw err;
        }
        response.setHeader('Content-Type','text/html;charset=utf-8');
        response.end(data)
    })
});

app.get('/register',(request,response)=>{
    console.log(request.url);
    // request.session.test='test session';
    // console.log(request.session.test)
    fs.readFile('assets/register.html',(err,data)=>{
        if (err){
            throw err;
        }
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.end(data)
    })
});
//embeded js
app.get('/ejs',(request,response)=>{
    let todoService = require('./service/TodoService');
    todoService.selectAll(datas_return=>{
        // console.log(datas_return);
        response.render("index",{datas_return});
    })

  // response.render("index",{datas:["valeur1","valeur2"]});
});


app.get('/',(request,response)=>{
    console.log(request.url);
    // request.session.test='test session';
    // console.log(request.session.test)

    fs.readFile('assets/index.html',(err,data)=>{
        if (err){
            throw err;
        }
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.end(data)
    })
});


app.listen(8080);
