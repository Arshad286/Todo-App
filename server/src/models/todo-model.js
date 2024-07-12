import mongoose, { Schema } from 'mongoose';

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim : true,
        index: true,
    },

    description: {
        type: String,
        required: true,
        trim : true,
        index: true,
    },

    type: { 
        type: String,
         enum: ['Official', 'Personal', 'Hobby'], 
         required: true,
         default: 'Official',
        },

    isPinned:{
        type: Boolean,
        default:false,

    },
    Completed:{
        type: Boolean,
        default:false,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },

    dueDate: {
        type: Date,
        required: true,
      },
}, {timestamps : true})

export default mongoose.model("Todo", todoSchema );