import express from "express";
import path from 'path';
const app=express();
// setting up view engine
app.set("view engine", "ejs")

app.get("/getproducts",(req,res)=>{
   
     res.render("index",{name:"Aakash"});
    });

app.listen(5000,()=>{
    console.log("Server is working");
})