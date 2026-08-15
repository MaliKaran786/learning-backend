const http=require("http")
const fs=require("fs")
const myServer=http.createServer((req,res)=>{
  const log=`${Date.now()}${req.url}New Request Received!\n`
  fs.appendFile("log.txt",log,(err,data)=>{
    console.log("New Request Received!!")
    switch(req.url){
      case `/`:res.end("HomePage")
      break;
      case `/about`:res.end("Hello Karan Malik")
      break;
      case `/Contact-us`:res.end("email")
      break;
      default:res.end("404")
    }
  })
})

myServer.listen(3002,()=>(console.log("Server Started")))