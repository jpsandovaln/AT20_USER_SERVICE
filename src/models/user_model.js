const mongoose = require('mongoose');
//create another schema
const userSchema = new mongoose.Schema(
    {
        id: { 
            type: Number,
        },
        name:{
            type: String,
        },  
        roles:[{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'rol',
            autopopulate: true
        }],
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
userSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('user', userSchema);