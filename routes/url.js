//Routes

//This all are the route to which our webpage will open
const express=require("express");
const {handleGenerateNewShortURL, handleGetAnalytics}=require("../controllers/url");
const router=express.Router();

router.post("/",handleGenerateNewShortURL);
router.get("/analytics/:shortId",handleGetAnalytics);

module.exports= router;