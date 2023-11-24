import http from "http"
//import gfName,{gfName2, gfName3} from "./features.js";
// the above part can be written as 
import {generateLovePercent} from "./features.js"
const server=http.createServer((req,res)=>{
    if(req.url=="/about"){
        res.end(`<h1>Love is ${generateLovePercent()}<h1>`);
    }
    else if(req.url=="/"){
        res.end("<h1>Home Page<h1>");
    }
   else if(req.url=="/contact"){
        res.end("<h1>Contact Page<h1>");
    }
    else{
        res.end("<h1>Page Not Found</h1>")
    }
}
);
server.listen(5000,()=>{
    console.log("Server is working")
});