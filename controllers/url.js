//This is the file which contain all the logic and function which we can export and use
const shortid=require("shortid");
const URL=require("../models/url")
//Functions for Routes
//we Got short Id
async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    // if(!body.url) return res.status(400).json({error:"URL is Required"});
    const shortID=shortid();
    // console.log("Started")
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
    });
    // console.log("ending");
    return res.json({id:shortID});
}


//
async function handleGetAnalytics(req,res){
    // this below line command, get the shortId from the url link
    const shortId=req.params.shortId;
    console.log(shortId);
    const result=await URL.findOne({shortId}).exec();
    console.log(result);
    if(!result) return res.json({error:"empty"})
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory, 
    });
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}