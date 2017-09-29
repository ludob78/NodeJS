let express=require('express');
let {Controller}=require('./AbstractController')
let UserModel=require('./model/user');
let PostsModel=require('./model/posts');
let app=express();
app.use("/user",(new Controller(UserModel)).getRouter());
app.use("/posts",(new Controller(PostsModel)).getRouter());

app.get('/',function (request,response) {
    response.write('Homepage');
    response.write('Node_ORM in /user <a href="/user"></a>');
    response.end()
});
app.listen(8080);