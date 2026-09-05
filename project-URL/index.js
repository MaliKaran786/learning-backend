const express = require('express')
const path=require('path')
const {connecToMongoDB}=require("./connect")
const urlRoute=require('./routes/url')
const URL=require('./models/url')
const staticRoute=require('./routes/staticRoute')
const app=express()


app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended : false}))
connecToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongoDB connected !'))

const PORT=3001
app.use("/url",urlRoute)
app.use('/',staticRoute)
app.get("/test", async(req,res)=>{
  const allURLs=await URL.find({})
  return res.render('home',{
    urls:allURLs
  })
})
app.get("/url/:shortId", async(req,res)=>{
  const shortId=req.params.shortId
  console.log("shortId received:", shortId);
  const entry=await URL.findOneAndUpdate(
    {shortId},
    { $push:{
    visitHistory:{
      timestamp:Date.now()
    }
  }})
   console.log("entry found:", entry);
  if (!entry) {
        return res.status(404).send("Short URL not found");
    }
  res.redirect(entry.redirectURL)
})
app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`))