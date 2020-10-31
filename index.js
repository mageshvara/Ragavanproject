const express=require('express');
const app=express();
const bodyParser=require("body-parser");


const ejs=require("ejs");
const imgid="1";
const server=require('http').Server(app);
const io=require("socket.io")(server);
var mysql = require('mysql'); 
const mongoose=require("mongoose");
const { strict } = require('assert');
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

if(process.env.NODE_ENV!='production'){
  require('dotenv').config()
}
const users = []
const bcrypt=require('bcrypt')
const request=require("request");
const { verify } = require("crypto");
const router = express.Router();
require('dotenv').config();
const product_id = process.env.API_ID;
const secret_token = process.env.API_KEY;
const methodOverride = require('method-override')
const flash=require('express-flash');
const session=require('express-session')
 
const passport = require("passport");

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


  // mysql
  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "saimagesh",
  //   database: "vvvsi"
    
  // });
  mysql
  var con = mysql.createConnection({
    host     : '85.10.205.173',
    port     :  3306,
    user: "magesh",
    password: "saimagesh",
    database: "vvvsiproject"
    
  });

  con.connect(function(err) {
    if (err) throw err;
    // var sql2="create table completedusers (userid varchar(100),username varchar(100),qualification varchar(100),whatsapp_num bigint(100),gender varchar(100),district varchar(100),joinstatus varchar(100),dateofapply varchar(1000),dateofgiven(1000))";
   
    // con.query(sql2, function (err, result){
    //   console.log("Connected!");
    // });
  
    console.log("Connected!");
  });

  //mongoDB

  // mongoose.connect("mongodb+srv://vvvsiuser:vvvsipass@cluster0.lsows.mongodb.net/vvvsi?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true} );
  // const schema={
  //   _id:String,
  //   userid:String,
  //   username:String,
  //   qualification:String,
  //   whatsapp_num:Number,
  //   gender:String,
  //   district:String,
  //   joinstatus:String,
  //   dateofapply:String,
  //   dateofgiven:String};
  //   User=mongoose.model("User",schema);

  //   const urls={
  //     url:String,
  //     iid:String,
  //   };

  //   Imageurl=mongoose.model("Imageurl",urls);
   
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.redirect("/home");
});

app.get('/review',(req,res)=>{
  var sql2="SELECT * FROM userreview where checked=1" 
 
  con.query(sql2,function(err, result){

    res.render('reviewpage',{posts: result,message:""})
  });
  
})
app.get('/home',(req,res)=>{
  var sql2="SELECT * FROM imageurl WHERE iid = ?"
    var data=imgid;
    con.query(sql2,data, function (err, result){
      var sql2="SELECT * FROM userreview where checked=1" 
 
      con.query(sql2,function(err, result2){
  
        res.render('home',{posts: result2,message:'',hurl:result[0].url});
      });
     
    });
});
function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

// This should work both there and elsewhere.
function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
app.post('/joingroup',(req,res)=>{
   // var sql = "INSERT INTO userdetail (userid,username,qualification,whatsapp_num,gender,district,joinstatus,dateofapply,dateofgiven) VALUES ?";  
    dataofapply1=new Date();
    
    userid1=req.body.whatsapp_num+"#vvvsm";
  if(req.body.username==""||req.body.qualification==""||req.body.whatsapp_num==""||req.body.gender==""||req.body.district=="")
  {
    var sql2="SELECT * FROM imageurl WHERE iid = ?"
    var data=imgid;
    con.query(sql2,data, function (err, result){
      var sql2="SELECT * FROM userreview where checked=1" 
 
      con.query(sql2,function(err, result2){
  
        res.render('home',{posts: result2,message:'Please Fill All The Fields',hurl:result[0].url});
      });
        });
  //   Imageurl.findOne({iid:imgid},function(err,result){
  //     res.render('home',{message:'Please Fill All The Fields',hurl:result.url});
  // });
  }
  else{
    var sql ="INSERT INTO userdetail (userid,username,qualification, whatsapp_num, gender, district, joinstatus, dateofapply, dateofgiven) VALUES ?";  
    var values = [  
      [userid1,req.body.username,req.body.qualification,req.body.whatsapp_num,req.body.gender,req.body.district,"no",dataofapply1.toString(),"0" ],  
      ];  

      var sql4="SELECT * FROM userdetail WHERE userid = ?"
      con.query(sql4,userid1, function (err, result) {
        if(err){
          console.log("not found");
      
        }
        else{
          
          if(!isEmptyObject(result)){
            console.log(result);
            if(result[0].userid==userid1){
             
              var sql3="SELECT * FROM imageurl WHERE iid = ?"
              var data=imgid;
              con.query(sql3,data, function (err, result){
                var sql2="SELECT * FROM userreview where checked=1" 
 
                con.query(sql2,function(err, result2){
            
                  res.render('home',{posts: result2,message:'you have already applied',hurl:result[0].url});
                });
              
              });
            }}
            else{
            
              con.query(sql,[values], function (err, result) {
                if(err){
                  console.log("not found");
              
                }
                else{
                  var sql3="SELECT * FROM imageurl WHERE iid = ?"
                  var data=imgid;
                  con.query(sql3,data, function (err, result){
                    var sql2="SELECT * FROM userreview where checked=1" 
 
                    con.query(sql2,function(err, result2){
                
                      res.render('home',{posts: result2,message:'Your data have been recived! Soon we will get you',hurl:result[0].url});
                    });
                  });
              
                }
              });
            }
          }
          });}
      });

app.post("/review",function(req,res)
{
  name=req.body.rname;
  email=req.body.remail;
  message=req.body.rmsg;
  dataofpost=new Date(new Date()).toISOString().split('T')[0];;
  sql="INSERT INTO userreview(reviewid,username,usermail,checked,usermessage,dateofpost) VALUES ?";
  var values = [  
    [0,name,email,"no",message,dataofpost],  
    ];  

    con.query(sql,[values], function (err, result) {
      if(err){
        console.log("not found");
      }
      else{
        var sql3="SELECT * FROM imageurl WHERE iid = ?"
        var data=imgid;
        con.query(sql3,data, function (err, result){
          var sql2="SELECT * FROM userreview where checked=1" 
 
          con.query(sql2,function(err, result2){
      
            res.render('home',{posts: result2,message:'Feedback Submitted',hurl:result[0].url});
         
        });
      });
      }
    });

})


app.post("/review2",function(req,res)
{
  name=req.body.rname;
  email=req.body.remail;
  message=req.body.rmsg;
  dataofpost=new Date(new Date()).toISOString().split('T')[0];;
  sql="INSERT INTO userreview(reviewid,username,usermail,checked,usermessage,dateofpost) VALUES ?";
  var values = [  
    [0,name,email,"no",message,dataofpost],  
    ];  

    con.query(sql,[values], function (err, result) {
      if(err){
        console.log("not found");
      }
      else{
        
          var sql2="SELECT * FROM userreview where checked=1" 
 
          con.query(sql2,function(err, result2){
      
            res.render('reviewpage',{message:'Feedback Submitted'});
         
        });
      }
      });
      
    

})



  //   const newuser=new User({
  //     _id:userid1,
  //     userid:userid1,
  //    username:req.body.username,
  //    qualification:req.body.qualification,
  //    whatsapp_num:req.body.whatsapp_num,
  //    gender:req.body.gender,
  //    district:req.body.district,
  //     joinstatus:"no",
  //     dateofapply:dataofapply1.toString(),
  //    dateofgiven:"0"  
  //   });
  //   User.findOne({userid:userid1},function(err,result){
  //     if(err){
  //       console.log("not found");
    
  //     }
  //     else{
  //   //console.log(result.userid,userid1);
  //   if(result){
  //     if(result.userid==userid1){
  //       Imageurl.findOne({iid:imgid},function(err,result){
  //         res.render('home',{message:'you have already applied',hurl:result.url});
  //     });
      
  //     }
  //   }
      
  //   else{
  //     newuser.save();
  //     Imageurl.findOne({iid:imgid},function(err,result){
  //       res.render('home',{message:'Your data have been recived! Soon we will get you',hurl:result.url});
  //   });
   
  //   }
    
  // }

      
  
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
 


 
  
  
  // mongoose.connect("mongodb+srv://vvvsiuser:vvvsipass@cluster0.lsows.mongodb.net/vvvsi?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true} );
  // const schema={
  //   _id:String,
  //   userid:String,
  //   username:String,
  //   qualification:String,
  //   whatsapp_num:Number,
  //   gender:String,
  //   district:String,
  //   joinstatus:String,
  //   dateofapply:String,
  //   dateofgiven:String};
  //   User=mongoose.model("User",schema);
  //   Completeduser=mongoose.model("Completeduser",schema);
  //   Pendinguser=mongoose.model("Pendinguser",schema);
  //   Survey=mongoose.model("Survey",schema);
  
    
  //   const urls={
  //     url:String,
  //     iid:String,
  //   };
  
  //   const admin={
  //     name:String,
  //     password:String
  //   };
  //   Admin=mongoose.model("Admin",admin);
  
  //   Imageurl=mongoose.model("Imageurl",urls);
  
  
  app.use(express.json())
    app.use(express.static("public"));
    app.set('view engine', 'ejs');
  
  
    app.use(flash())
    app.use(session({
      secret:process.env.SESSION_SECRET,
      resave:false,
      saveUninitialized:false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride('_method'))
  
  
  app.get('/admin',async (req, res) => {
    try {
      const hashedPassword =await  bcrypt.hash(process.env.Password, 10)
      users.push({
        id: Date.now().toString(),
    name: process.env.Admin_name,
    email: process.env.Admin_Email,
    password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  app.get("/adminoptions",checkAuthenticated,(req,res)=>{
    
        res.render("adminoptions"); 
  })

  app.get("/reviewaccess",checkAuthenticated,(req,res)=>{

    var sql2="SELECT * FROM userreview where checked=0" 
 
    con.query(sql2,function(err, result){
  
      res.render('reviewaccess',{posts: result})
    });
   
  })
  app.get("/reviewlist",checkAuthenticated,(req,res)=>{

    var sql2="SELECT * FROM userreview where checked=1" 
 
    con.query(sql2,function(err, result){
  
      res.render('finalreviewlist',{posts: result})
    });
   
  })

  app.post("/acceptreview",checkAuthenticated,(req,res)=>{
    sql1="UPDATE userreview SET checked=1 WHERE reviewid=?"
    data=req.body.rid;
    con.query(sql1,data, function (err, result)
    {if (err) throw err;
      if(result){
        var sql2="SELECT * FROM userreview where checked=0" 
 
    con.query(sql2,function(err, result){
  
      res.render('reviewaccess',{posts: result})
    });
      }
      
    });

  })

  app.post("/removereview",checkAuthenticated,(req,res)=>{
    sql1="DELETE FROM userreview WHERE reviewid=?"
    data=req.body.rid2;
    con.query(sql1,data, function (err, result)
    {if (err) throw err;
      if(result){
        var sql2="SELECT * FROM userreview where checked=0" 
 
    con.query(sql2,function(err, result){
  
      res.render('reviewaccess',{posts: result})
    });
      }
      
    });

  })
  app.post("/removereview2",checkAuthenticated,(req,res)=>{
    sql1="DELETE FROM userreview WHERE reviewid=?"
    data=req.body.rid2;
    con.query(sql1,data, function (err, result)
    {if (err) throw err;
      if(result){
        var sql2="SELECT * FROM userreview where checked=1" 
 
    con.query(sql2,function(err, result){
  
      res.render('finalreviewlist',{posts: result})
    });
      }
      
    });

  })

  
  app.post("/giveaccess",checkAuthenticated,(req,res)=>{
    var data=req.body.district;
    var sql2="SELECT * FROM userdetail WHERE district = ?"
    con.query(sql2,data, function (err, result)
    {if (err) throw err;
      if(result){
        res.render("giveaccess",{posts:result})
      }
      
    });
    // User.find({district:selected_district},function(err,datas){
    //   res.render("giveaccess",{posts:datas})
    // });
    });
  
    app.get("/completed",checkAuthenticated,(req,res)=>{
      var sql2="SELECT * FROM completedusers";
      con.query(sql2, function (err, result) {
        res.render("completed",{posts:result})
      });
      // Completeduser.find({},function(err,datas){
      //   res.render("completed",{posts:datas})
      // });
      });
  app.post("/completed",checkAuthenticated,(req,res)=>{
    district1=req.body.district;
    var sql2="SELECT * FROM userdetail WHERE district = ?";
    con.query(sql2,district1, function (err, result){
      res.render("completed",{posts: result})
    });
    // Completeduser.find({district:district1},function(err,datas){
    //   res.render("completed",{posts:datas})
    // });
  })
  app.get("/pending",checkAuthenticated,(req,res)=>{
    var sql2="SELECT * FROM userdetail"
    con.query(sql2, function (err, result)
    {if (err) throw err;
      if(result.length!=0){
        res.render("giveaccess",{posts:result})
      }
    });
    // User.find({},function(err,datas){
    //   res.render("pending",{posts:datas,count:datas.length})
    // });
    });
    app.get("/survey",checkAuthenticated,(req,res)=>{
     
        res.render("survey",{posts:[],filename:"0"})
     
      });
      function splitdata(str)
      {
  
              var month = new Array();
              month[1] = 'Jan';
              month[2] = "Feb";
              month[3] = "Mar";
              month[4] = "Apr";
              month[5] = "May";
              month[6] = "Jun";
              month[7] = "Jly";
              month[8] = "Aug";
              month[9] = "Sep";
              month[10] = "Oct";
              month[11] = "Nov";
              month[12] = "Dec";
              var n = month[str];
        
               
           return n;
      }
      function isEmptyObject(obj) {
        return !Object.keys(obj).length;
      }
      
      // This should work both there and elsewhere.
      function isEmptyObject(obj) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
          }
        }
        return true;
      }
    app.post("/survey",checkAuthenticated,(req,res)=>{
      
               var year=req.body.year;
             var month=splitdata(req.body.month);
             var sql2="SELECT * FROM completedusers WHERE dateofapply LIKE '% "+year+"%' AND dateofapply LIKE '% "+month+"%'";
      
             con.query(sql2, function (err, datas) {
            
                  if(isEmptyObject(datas)){
                    res.render("survey",{posts:[],filename:"0"})
                  }
                  else{
                    res.render("survey",{posts:datas,filename:month+'-'+year})
                  }
              
              
             });
          
  // Completeduser.find({dateofapply:{$regex: new RegExp('.*' + year+ '.*') }},function(err,datas1){
  
  //   if(isEmptyObject(datas1)){
  //     res.render("survey",{posts:[],filename:"0"}) 
  //   }
  //   else{
   
  //     Completeduser.find({dateofapply:new RegExp('.*' + month + '.*')} ,function(err,datas){
  //       if(isEmptyObject(datas)){
  //         res.render("survey",{posts:[],filename:"0"})
  //       }
  //       else{
  //         res.render("survey",{posts:datas,filename:month+'-'+year})
  //       }
    
  //    });
    
  // }
  //   });
  });
  
  
  app.post("/pending",checkAuthenticated,(req,res)=>{
  district1=req.body.district;
  var sql2="SELECT * FROM userdetail WHERE district = ?"
  con.query(sql2,district1, function (err, result)
  {if (err) throw err;
    if(result.length!=0){
      res.render("giveaccess",{posts:result})
    }
  });
  // User.find({district:district1},function(err,datas){
  //   res.render("pending",{posts:datas,count:datas.length})
  // });
  })
  
  
    app.post("/sendlink",checkAuthenticated,(req,res)=>{
      var message1=req.body.link1;
       var num=req.body.whatsnum;
       var userid1=num+"#vvvsm"
       var whats='whatsapp:+91'+num;
       let data = {
        to_number: '+91'+num, // Receivers phone
        message: message1, // Message
        type: "text" // Message type
      };request({
        url: url,
        method: "POST",
        headers: {
          "x-maytapi-key": secret_token
        },
        json: data
      });
      //  client.messages.create({
      //    from: 'whatsapp:+14155238886',
      //    body: message1,
      //    to: whats
      //  }).then(message => console.log(message.sid));
   
      var sql2="SELECT * FROM userdetail WHERE userid = ?"
      con.query(sql2,userid1, function (err, result)
      {if (err) throw err;
       else{  if(result){
        dateofgiven1=new Date;
   
          if(result[0].userid==userid1){
            var sql ="INSERT INTO completedusers (userid,username,qualification, whatsapp_num, gender, district, joinstatus, dateofapply, dateofgiven) VALUES ?";  
            var values = [  
              [userid1,result[0].username,result[0].qualification,result[0].whatsapp_num,result[0].gender,result[0].district,"yes",result[0].dateofapply,dateofgiven1.toString() ],  
              ];  
              con.query(sql, [values], function (err, result) {
  
                if (err) throw err;
              });
          }
        
      else{
       
     console.log("notfound");
        
      }  }}
    });
       
    var sql = "DELETE FROM userdetail WHERE userid = ?";
    var val=userid1;
   // console.log(val);
    
    con.query(sql, val,function (err, result) {
      if(err) throw err;
      console.log('the document is deleted')
    });
  
    var sql2="SELECT * FROM userdetail WHERE district = ?"
  
       var selected_district=req.body.district;
       con.query(sql2,selected_district, function (err, result) {
        res.render("giveaccess",{posts:result})
       })
     
     });
     
    app.get('/update',(req,res)=>{
    
    res.render("update");
    });
    app.post('/update',(req,res)=>{
      
      headerurl=req.body.url;
      var sql2="SELECT * FROM imageurl WHERE iid = ?"
      var data=imgid;
      con.query(sql2, data, function (err, result) {
        if(err){
          console.log("not found");
      
        }
        else{
  
      if(result){
        var sql="INSERT INTO imageurl (iid,url) VALUES ?";  
        var values = [imgid,headerurl]; 
        con.query(sql, [values], function (err, result)
         {  if(err) throw err;
  
        else{
          res.render("update");}
        });
  
    }
    else{
  
      var sql="INSERT INTO imageurl (iid,url) VALUES ?";  
      var values = [imgid,headerurl]; 
      con.query(sql, [values], function (err, result) {
        if(err) throw err;
        else{
          res.render("update");}
      });
     
    }
       } });});
  
    //   Imageurl.findOne({iid:imgid},function(err,result){
    //     if(err){
    //       console.log("not found");
      
    //     }
    //     else{
    //   //console.log(result.userid,userid1);
    //   if(result){
    //   Imageurl.updateOne({iid:imgid},{ $set: {url: headerurl, iid: imgid} },function(err,result){
    //     res.render("update");
    //   });
    // }
    // else{
    //   const imgn=new Imageurl({
        
    //     url:headerurl,
    //     iid:imgid
    //   });
    //   imgn.save();
    //   res.render("update");
    // }
    //     }
     
    // });});
  
  //   app.get('/new',async (req,res)=>{
  //     name='VeraRagavan';
  //     password='Veraragavan@vvvsi';
  //     try{
       
  //       const hashpass=await bcrypt.hash(password,10)
  //       const newadmin=new Admin({
  //         name:'VeraRagavan',
  //         password:hashpass
  //       });
  //       newadmin.save();
  //       res.render("login");
  //     }
  //     catch{
  // res.status(500).send()
  //     }
     
     
  //   });
  
    app.get("/login",checkNotAuthenticated,(req,res)=>{
      res.render("login");
    });
    
    
    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/login',
      failureFlash: true
    }))
    // (req,res)=>{
    //   const adminname=req.body.name;
    //   const pass=req.body.password;
    //   Admin.findOne({name:adminname},function(err,result){
    //     if(result==null)
    //     {
    //       return res.status(400).send("cannot find")
    //     }
    //     else{
    //     try{
    //       bcrypt.compare(pass,result.password,(err,ismatch)=>{
    //       if(ismatch){ console.log("worked");
    //       jwt.sign({result},'secretekey',{expiresIn:'30s'},(err,token)=>{
    //           console.log(token);
    //           res.redirect("adminoptions");
    //        });
    //       }
    //        else{
    //          console.log("notfound");
    //        }
    //       })
    //     }
    //     catch
    //     {
    //       res.status(500).send()
    //     }
     
    // }
  //})
    
   // });
   app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/admin')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/admin')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/adminoptions')
    }
    next()
  }
  


 server.listen(process.env.PORT||3030);