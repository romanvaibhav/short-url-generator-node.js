const User=require("./../models/user");
const {v4:uuidv4}=require("uuid");
const {setUser}=require("./../service/auth")

async function handleUserSignup(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error:"Invalid Username or Password",
        });
    }
    // const sessionId=uuidv4();
    // setUser(sessionId,user)

    const token=setUser(user);
    res.cookie("uid",token);
    console.log("Not storing Cookie")

    //For chrome
    // res.cookie("uid", sessionId, {
    //     httpOnly: true,        // Cookie cannot be accessed by JavaScript
    //     secure: process.env.NODE_ENV === "production",  // Only over HTTPS
    //     sameSite: "Strict",     // Restrict cross-origin cookie sending
    //     maxAge: 24 * 60 * 60 * 1000 // Optional, cookie expiry in 1 day
    //   });
    return res.redirect("/");
}

module.exports={
    handleUserSignup,
    handleUserLogin,

}