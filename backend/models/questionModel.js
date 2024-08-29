const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
    {
        question:{
            type: String,
            required:[true, "please enter a  question" ]
        },
        options:{
            type: Array,
            required:[true,"please set options"]
        },
        answer:{
            type:String,
            required:[true,"enter correct answer to the question"]
        },
        justification:{
            type:String,
        }
    },
    {timestamps:true},
   
)
const question = mongoose.model("question", questionSchema)
module.exports = question;
