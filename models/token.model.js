
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: { type: String },
});

module.exports = mongoose.model("Token", tokenSchema);
