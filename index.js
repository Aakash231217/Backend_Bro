import express from "express";
import path from 'path';

const app=express();
const users=[];
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/",(req,res)=>{
     res.render("index",{name:"Singh"});
})

app.get("/success",(req,res)=>{
    res.render("success");
})

app.post("/contact",(req,res)=>{
   console.log(req.body);
   users.push({username:req.body.name,email:req.body.email});
   res.redirect("/success");
})

app.get("/users",(req,res)=>{
    res.json({
        users,
    })
})
app.listen(5000,()=>{
    console.log("Server is working")
})