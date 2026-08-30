const UserModel = require("../models/user")


async function handleGetAllUsers(req,res){
   const allDBUser=await UserModel.find({})
    return res.json(allDBUser)
}
async function handlegetUsersById(req,res){
  const user=await UserModel.findById(req.params.id)
  if(!user) return res.status(404).json({msg:"User Not found!!"})
  return res.json(user)
}
async function handleupdateUsersById(req,res){
  await UserModel.findByIdAndUpdate(req.params.id,{lastName:'Changed'})
  return res.json({status: "Success"})
}
async function handledeleteUsersById(req,res) {
  await UserModel.findByIdAndDelete(req.params.id)
  return res.json({status: "Success"})
}
async function handleCreateUser(req,res) {
  {
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
 
 return res.status(201).json({msg: "success",id: result._id})
}
}
module.exports={
  handleGetAllUsers,
  handlegetUsersById,
  handleupdateUsersById,
  handledeleteUsersById,
  handleCreateUser
}