const express=require('express')
const router=express.Router()
const {handleGetAllUsers,
  handlegetUsersById,
  handleupdateUsersById,
  handledeleteUsersById,
  handleCreateUser}=require('../controllers/user')

router.route("/").get(handleGetAllUsers).post(handleCreateUser)

router
.route('/:id')
.get(handlegetUsersById)
.patch(handleupdateUsersById)
.delete(handledeleteUsersById)

module.exports=router;