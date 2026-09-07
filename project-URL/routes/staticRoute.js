const express = require('express')
const router=express.Router()
const URL = require('../models/url')
router.get('/',async (req,res)=>{
  const allURLS=await URL.find({})
  return res.render('home',{
    url:allURLS,
  })
})
router.get('/signup',async(req,res)=>{
  return res.render('signup') 
})
router.get('/login',async(req,res)=>{
  return res.render('login') 
})

module.exports=router