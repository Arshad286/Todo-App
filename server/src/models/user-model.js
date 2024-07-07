import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {type : String},
    lastName: {type : String},
    email: {type : String},
    password: {type : String},
    createdOn: {type: Date, default: new Date().getTime()},
})

export default mongoose.model('User', userSchema);