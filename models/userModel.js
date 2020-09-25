


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    number: { type: String, required: true, min: 10, max: 15, unique: true },
    name: { type: String, required: true, min: 3, max: 15 },
    password: { type: String, required: true, min: 6, max: 15 }
});

const userModel = mongoose.model('users', userSchema);
export default userModel;
