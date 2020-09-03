const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const ejs=require("ejs");
const server=require('http').Server(app);
const io=require("socket.io")(server);

app.use(bodyParser.urlencoded({
    extended: true
  }));


app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.redirect("/home");
});
app.get('/home',(req,res)=>{
    res.render('home');
});

 server.listen(process.env.PORT||3030);