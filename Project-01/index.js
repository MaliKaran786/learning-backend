const express=require('express')
const fs=require('fs')
const mongoose=require('mongoose')

const { json } = require('stream/consumers')
const { timeStamp } = require('console')
const app=express()
mongoose.connect('mongodb://127.0.0.1:27017/my-firstdb')
.then(()=> console.log("MongoDB Connected!"))
.catch((err)=>console.log("Mongo Error",err))
const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    reuired :true
  },
  lastName :{
    type:String
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  jobTitle:{
    type :String
  },
  gender:{
    type:String
  }

},{timestamps:true}
);
const UserModel=mongoose.model("user",userSchema)
app.use(express.urlencoded({extended : false}))
app.use((req,res,next)=>{
    fs.appendFile('log.txt',`\n${Date.now()} :${req.ip} : ${req.method} : ${req.path}`,(err,data)=>{
      next()
    })
})
app.use((req,res,next)=>{
    console.log("Middleware 1",req.myusername);
    next()
})
app.get('/users',async (req,res)=>{
  const allDBUser=await UserModel.find({})
  const html=`
  <ul>
      ${allDBUser
        .map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}
  </ul>
  `
  res.send(html)
})
app.get('/api/users',async(req,res)=>{
  const allDBUser=await UserModel.find({})
  return res.json(allDBUser)
})
app
.route('/api/users/:id')
.get(async (req,res)=>{
  const user=await UserModel.findById(req.params.id)
  if(!user) return res.status(404).json({msg:"User Not found!!"})
  return res.json(user)
})
.patch(async(req,res)=>{
  await UserModel.findByIdAndUpdate(req.params.id,{lastName:'Changed'})
 
  return res.json({status: "Success"})
})
.delete(async (req,res)=>{
  await UserModel.findByIdAndDelete(req.params.id)
  
  return res.json({status: "Success"})
})
app.post('/api/users',async (req,res)=>{
  const body=req.body
  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender ||!body.job_title){
    return res.status(400).json({msg: "All fields are required..."})
  }
 const result= await UserModel.create({
  firstName:body.first_name,
  lastName:body.last_name,
  email:body.email,
  gender:body.gender,
  jobTitle:body.job_title,
 })
 
 return res.status(201).json({msg: "success"})
})
const PORT=3002

app.listen(PORT,()=>{console.log(`Server Started at port :${PORT}`)})