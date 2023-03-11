const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        id: { 
            type: Number,
        },
        name:{
            type: String,
        },  
        role:{
            type: String,
        },
        description:{
            type: String,
        },
        email:{
            type: String,
            unique: true
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);

module.exports = mongoose.model('user', userSchema);