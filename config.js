


import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://ameenmari:3s9kMMYHZ2tyBPw3@cluster0.60rwu.gcp.mongodb.net/<oraan>?retryWrites=true&w=majority',

    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',


};
