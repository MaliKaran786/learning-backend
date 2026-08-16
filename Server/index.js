const http=require("http")
const fs=require("fs")
const url=require("url")

const myServer=http.createServer((req,res)=>{
  if(req.url==="/favicon.ico") return res.end()
  const log=`${Date.now()}${req.url}New Request Received!\n`
  const myUrl=url.parse(req.url,true)
  console.log(myUrl)
  fs.appendFile("log.txt",log,(err,data)=>{
    console.log("New Request Received!!")
    switch(myUrl.pathname){
      case `/`:res.end("HomePage")
      break;
      case `/about`:
      const username=myUrl.query.name
      res.end(`Hi ${username}`)
      break;
      case '/search':
        const search=myUrl.query.search_query
        res.end('Here Are your search results for :'+search)
        break;
      case `/Contact-us`:res.end("email")
      break;
      default:res.end("404")
    }
  })
})

myServer.listen(3002,()=>(console.log("Server Started")))