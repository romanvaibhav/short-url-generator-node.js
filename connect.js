const mongoose=require("mongoose");
mongoose.set("strictQuery",true);

//Coonection of mongoDB with Database
async function connectToMongoDB(url){
    //Here we pass the url from the file index.js
    mongoose.connect(url);
}

module.exports={
    connectToMongoDB,
}