const express = require('express')
const {connecToMongoDB}=require("./connect")
const urlRoute=require('./routes/url')
const URL=require('./models/url')
const app=express()
app.use(express.json())
connecToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongoDB connected !'))
const PORT=3001
app.use("/url",urlRoute)
app.get("/:shortId", async(req,res)=>{
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