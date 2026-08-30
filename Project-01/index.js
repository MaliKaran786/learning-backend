const express=require('express')
const userRouter=require('./routes/user')
const {connectMongoDB}=require('./connection')
const app=express()
const {logtxtfile}=require('./middlewares')
connectMongoDB('mongodb://127.0.0.1:27017/my-firstdb')
.then(()=>console.log("MongoDB connected!")) 
app.use(express.urlencoded({extended : false}))
app.use(logtxtfile('log.txt'))

 app.use('/api/users',userRouter)

const PORT=3002

app.listen(PORT,()=>{console.log(`Server Started at port :${PORT}`)})