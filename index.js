const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const ejs=require("ejs");
const server=require('http').Server(app);
const io=require("socket.io")(server);
var mysql = require('mysql'); 
app.use(bodyParser.urlencoded({
    extended: true
  }));
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saimagesh",
    database: "vvvsi"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  

app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.redirect("/home");
});
app.get('/home',(req,res)=>{
    res.render('home',{message:''});
});
app.post('/joingroup',(req,res)=>{
    var sql = "INSERT INTO userdetail (userid,username,qualification,whatsapp_num,gender,district,joinstatus,dateofapply,dateofgiven) VALUES ?";  
    dataofapply=new Date();
    userid1=req.body.whatsapp_num+"#vvvsm";
    console.log(userid1);
  var values = [  
  [userid1,req.body.username,req.body.qualification,req.body.whatsapp_num,req.body.gender,req.body.district,"no",dataofapply,0],  
  ];
  var sql2="SELECT * FROM userdetail WHERE userid = ?"
  var data=req.body.whatsapp_num+"#vvvsm";
  con.query(sql2,data, function (err, result) {
    if (err) throw err;
    if(result.length==0){
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        res.render("home",{message:"Your data have been recived! Soon we will get you"});
      });
    }
    else{
        res.render("home",{message:"you have already applied"});
    
    }
    
  });
})
 server.listen(process.env.PORT||3030);