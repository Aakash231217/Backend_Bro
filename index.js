import express from "express";
import path from 'path';

const app=express();
app.use(express.static(path.join(path.resolve(),"public")));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
     res.sendFile("index.html")
})
app.listen(5000,()=>{
    console.log("Server is working")
})