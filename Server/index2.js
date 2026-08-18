
const express=require('express')

const app=express()

app.get('/',(req,res)=>{
  res.end("Hello form homePage");
})
app.get('/about',(req,res)=>{
  res.end("Hello form about Page"+" hey "+req.query.name);
})

app.listen(3002,()=>(console.log("Server Started")))