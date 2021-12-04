require("dotenv").config();
const trainModel =  require("./models/train");
const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");
const { response } = require("express");
mongoose
.connect(process.env.MONGOURL)
.then(() => console.log("mongo db connected"));

//Get Data of Registration user
app.get("/list",async(req,res)=> {
    const trainList = await trainModel.find({},{username:true});

    if(trainList.length === 0)
    {
        return res.json({data:"No any User Exist in Train Registration"});
    }

    return res.json({data:trainList});
});

//Register User for train seat
app.post("/registration",(req,res)=>{
    const { newUser } = req.body;
    trainModel.create(newUser);
    return res.json({data:"Registration Done Successfully!!"});
});


//Login User
app.post("/login",async(req,res)=> {
    const uname = req.body.username;
    const pass = req.body.password;
    const user = await trainModel.findOne({username:uname,password:pass});

    if(user) {
        return res.json({data:"Login Successfully!!"});
    }

    return res.json({data:"Wrong Credentials!!"});
});

//Update Password
app.put("/user/changepassword/:uname",async(req,res)=>{
    const uname = req.params.username;
    const pass = req.body.password;
    const newpassword = await trainModel.findOneAndUpdate(
        {username:uname},
        {password:pass},
        {new:true}
        );

        return res.json({data:"Password Updated Successfully!!!"});
});

app.listen(port,() => {
    console.log("Server Running on port 5000");
});