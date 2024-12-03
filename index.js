const express=require("express");
const urlRoute=require("./routes/url");
const {connectToMongoDB}=require("./connect")
const URL=require("./models/url")
const app=express();
const PORT=8001;


//MongoDB connection with database
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDB connected"));

//middleware
app.use(express.json());

//Routes
app.use("/url",urlRoute);


//We are redirecting the shortId to the redirectURL(Original url)
app.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    console.log(shortId);
    const entry=await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            },
        }
    }
);
    res.redirect(entry.redirectURL);

})

app.listen(PORT, ()=> console.log(`server is starte at PORT: ${PORT}`));