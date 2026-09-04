const express=require('express')
const {handleGenShortURL,handleGetAnalytics}=require('../controllers/url')
const router=express.Router()

router.post("/",handleGenShortURL)
router.get('/analytics/:shortId',handleGetAnalytics)
module.exports=router