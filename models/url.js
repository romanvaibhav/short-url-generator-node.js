//**Here we are importing monggose 
const mongoose = require("mongoose");

//**Structure of Database we have to create this such thst it will store our data in mongoDB database
const urlSchema = new mongoose.Schema({
    shortId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},
    { timestamps: true },
)


//**Here we are Creating Model "url" is the name of our database actually here we declare the database name and store data in it
const URL = mongoose.model("url", urlSchema);

//It exports URL  
//**remember the syntax for the export
module.exports = URL;