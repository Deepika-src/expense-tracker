const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },

        securityQuestions:{
            type: String,
            required:true,
            enum: ["Enter your hometown:", "Enter your pet name:", "Enter your school name:", "Enter your favourite teacher:"],
        },

        securityAnswers:{
            type: String,
            required:true
        },

        profileImage:{
            type:String,
            default:""
        }
    },{
        timestamps:true
    }
);

module.exports = mongoose.model("User", userSchema);