import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim : true,
    },

    description: {
        type: String,
        required: true,
        trim : true,
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
        type: String,
        required:true,
    },

    dueDate: {
        type: Date,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      }
})

export default mongoose.model("Todo", todoSchema );