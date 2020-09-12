const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const ejs=require("ejs");

const server=require('http').Server(app);
const io=require("socket.io")(server);
var mysql = require('mysql'); 
const mongoose=require("mongoose");
const { strict } = require('assert');
app.use(bodyParser.urlencoded({
    extended: true
  }));

  //mysql
  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "saimagesh",
  //   database: "vvvsi"
  // });

  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  // });

  //mongoDB

  mongoose.connect("mongodb+srv://vvvsiuser:vvvsipass@cluster0.lsows.mongodb.net/vvvsi?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true} );
  const schema={
    _id:String,
    userid:String,
    username:String,
    qualification:String,
    whatsapp_num:Number,
    gender:String,
    district:String,
    joinstatus:String,
    dateofapply:String,
    dateofgiven:String};
    User=mongoose.model("User",schema);

app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.redirect("/home");
});
app.get('/home',(req,res)=>{
    res.render('home',{message:''});
});
app.post('/joingroup',(req,res)=>{
   // var sql = "INSERT INTO userdetail (userid,username,qualification,whatsapp_num,gender,district,joinstatus,dateofapply,dateofgiven) VALUES ?";  
    dataofapply1=new Date();
    
    userid1=req.body.whatsapp_num+"#vvvsm";
  
    const newuser=new User({
      _id:userid1,
      userid:userid1,
     username:req.body.username,
     qualification:req.body.qualification,
     whatsapp_num:req.body.whatsapp_num,
     gender:req.body.gender,
     district:req.body.district,
      joinstatus:"no",
      dateofapply:dataofapply1.toString(),
     dateofgiven:"0"  
    });
    User.findOne({userid:userid1},function(err,result){
      if(err){
        console.log("not found");
    
      }
      else{
    //console.log(result.userid,userid1);
    if(result){
      if(result.userid==userid1){
        res.render("home",{message:"you have already applied"});
      }
    }
      
    else{
      newuser.save();
      res.render("home",{message:"Your data have been recived! Soon we will get you"});
    }
    
  }
      
    })
  // var sql2="SELECT * FROM userdetail WHERE userid = ?"
  // var data=req.body.whatsapp_num+"#vvvsm";
  // con.query(sql2,data, function (err, result) {
  //   if (err) throw err;
  //   if(result.length==0){
  //     con.query(sql, [values], function (err, result) {
  //       if (err) throw err;
  //       res.render("home",{message:"Your data have been recived! Soon we will get you"});
  //     });
  //   }
  //   else{
  //       res.render("home",{message:"you have already applied"});
    
  //   }
    
  // });
})
 server.listen(process.env.PORT||3030);