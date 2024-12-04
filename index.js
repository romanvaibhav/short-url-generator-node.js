const express=require("express");
const path=require("path");
const cookieparser=require("cookie-parser")
const {connectToMongoDB}=require("./connect")
const {restrictToLoggedinUserOnly,checkAuth}=require("./middlewares/auth")


const URL=require("./models/url")


const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");


//Creating Port and all
const app=express();
const PORT=8001;


//MongoDB connection with database
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDB connected"));

//Set the view engine
app.set("view engine","ejs");
//Tell the path of views folder
app.set("views",path.resolve("./views"));
//middleware which support JSON data
app.use(express.json());
//middleware which support the FORM data
app.use(express.urlencoded({extended:false}));

app.use(cookieparser());


// app.get("/test", async(req,res)=>{
//     const allUrls=await URL.find({});
//     //Used to render our home page in views possible due to EJS
//     return res.render("home",{
//         urls:allUrls,
//     });
// });

//Routes
app.use("/url",restrictToLoggedinUserOnly ,urlRoute);
app.use("/",checkAuth ,staticRoute);
app.use("/user",userRoute);


//We are redirecting the shortId to the redirectURL(Original url)
app.get("/url/:shortId",async(req,res)=>{
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