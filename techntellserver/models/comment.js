const mongoose =require("mongoose");
const Schema = mongoose.Schema;
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },        
    author:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
}, {
    timestamps: true
});
var Comments = mongoose.model('comments',commentSchema);
module.exports=Comments;