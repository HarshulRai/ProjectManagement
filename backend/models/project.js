const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const projectSchema = new Schema({
    projectname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = mongoose.model('Project' , projectSchema)

