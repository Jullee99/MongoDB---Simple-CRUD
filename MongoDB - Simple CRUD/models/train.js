const mongooose = require("mongoose");

const trainSchema = mongooose.Schema({
    username:String,
    password:String,
    trainno:Number,
    stationfrom:String,
    stationto:String,
});

const trainModel = mongooose.model("trainRegistration",trainSchema,"trainRegistration");
module.exports = trainModel;