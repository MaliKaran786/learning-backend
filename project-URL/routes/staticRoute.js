const express = require('express')
const router=express.Router()

router.get('/',async (req,res)=>{
  const allURLS=await URL.find({})
  return res.render('home',{
    url:allURLS,
  })
})

module.exports=router