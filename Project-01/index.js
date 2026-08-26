const express=require('express')
const fs=require('fs')
const users=require('./MOCK_DATA.json')
const { json } = require('stream/consumers')
const app=express()
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
app.get('/users',(req,res)=>{
  const html=`
  <ul>
      ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
  </ul>
  `
  res.send(html)
})
app.get('/api/users',(req,res)=>{
  res.setHeader("X-MyName","Karan Malik")
  console.log(req.headers)
  return res.json(users)
})
app
.route('/api/users/:id')
.get((req,res)=>{
  const id=Number(req.params.id)
  const user=users.find((user)=> user.id===id)
  if(!user) return res.status(404).json({msg:"User Not found!!"})
  return res.json(user)
})
.patch((req,res)=>{
  const id=Number(req.params.id)
  const user=users.find((user)=>user.id===id)
  user.first_name="Hello"
  return res.json(users)
})
.delete((req,res)=>{
  const id=Number(req.params.id)
  const newArr=users.filter((user)=>user.id != id)
  console.log("deleted SUer with id :",id)
  return res.json(newArr)
})
app.post('/api/users',(req,res)=>{
  const body=req.body
  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender ||!body.job_title){
    return res.status(400).json({msg: "All fields are required..."})
  }
  users.push({...body,id:users.length + 1})
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.status(201).json({Status : "Success",id: users.length })
  })
})
const PORT=3002

app.listen(PORT,()=>{console.log(`Server Started at port :${PORT}`)})