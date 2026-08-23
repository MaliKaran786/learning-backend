const express=require('express')
const fs=require('fs')
const users=require('./MOCK_DATA.json')
const { json } = require('stream/consumers')
const app=express()
app.use(express.urlencoded({extended : false}))
app.get('/users',(req,res)=>{
  const html=`
  <ul>
      ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
  </ul>
  `
  res.send(html)
})
app.get('/api/users',(req,res)=>{
  return res.json(users)
})
app
.route('/api/users/:id')
.get((req,res)=>{
  const id=Number(req.params.id)
  const user=users.find((user)=> user.id===id)
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
  users.push({...body,id:users.length + 1})
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.json({Status : "Success",id: users.length })
  })
})
const PORT=3002

app.listen(PORT,()=>{console.log(`Server Started at port :${PORT}`)})