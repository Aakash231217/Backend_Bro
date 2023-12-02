import express from "express";
import path from 'path';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017",{
    dbname:"backend",
})
.then(()=>console.log("Database Connected"))
.catch((e)=>console.log(e));

const messageSchema= new mongoose.Schema({
name:String,
email:String,
})

const Message= mongoose.model("Message",messageSchema);


const app=express();
const users=[];
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/",(req,res)=>{
     res.render("index",{name:"Singh"});
})
app.get("/add",(req,res)=>{
    Message.create({name:"Aakash",email:"rktaakash@gmail.com"}).then(()=>{
        res.send("Nice")
    });
})
app.get("/success",(req,res)=>{
    res.render("success");
})

app.post("/contact",(req,res)=>{
   console.log(req.body);
   users.push({username:req.body.name,email:req.body.email});
   res.redirect("/successpage");
})

app.get("/users",(req,res)=>{
    res.json({
        users,
    })
})
app.listen(5000,()=>{
    console.log("Server is working")
})