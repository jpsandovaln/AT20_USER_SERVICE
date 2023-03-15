const mongoose = require('mongoose');
//create another schema
const roleSchema = new mongoose.Schema(
    {
        user:[{
            type: [mongoose.Types.ObjectId],
            ref: 'user',
            autopopulate: true
        }],
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
roleSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('rol', roleSchema);