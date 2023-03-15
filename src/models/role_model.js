const mongoose = require('mongoose');
//create another schema
const roleSchema = new mongoose.Schema(
    {
        user:{
            type: [mongoose.Types.ObjectId],
            ref: 'user'
        },
        name:{
            type: String,
        },
        description:{
            type: String,
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);
module.exports = mongoose.model('rol', roleSchema);