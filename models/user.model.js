import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Token from "./token.model";

const ACCESS_TOKEN_SECRET = '9a6aed9cfd98a6fba3ef38b4c120ad0a8fd441c8c911c97fdfbcd51c6d879ae6149743a802cbea1bdd0701eabf77062ba3e89e61f28472914c16fb47e49cada5';
const REFRESH_TOKEN_SECRET = '988f2aa64c7008d8abd4b4f11019849b549a017af7722d2548d6b864e1e2f739df0c4aff30a62b5a71c2b9be22e3df2e309b3e2ebae0f26e65dbc6585614a7a4';


const userSchema = new mongoose.Schema({


    number: { type: String, required: true, min: 10, max: 15, unique: true },
    name: { type: String, required: true, min: 3, max: 15 },
    password: { type: String, required: true, min: 6, max: 15 }


});


userSchema.methods = {
    createAccessToken: async function () {
        try {
            let { _id, username } = this;
            let accessToken = jwt.sign(
                { user: { _id, username } },
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "10m",
                }
            );
            return accessToken;
        } catch (error) {
            console.error(error);
            return;
        }
    },
    createRefreshToken: async function () {
        try {
            let { _id, username } = this;
            let refreshToken = jwt.sign(
                { user: { _id, username } },
                REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "1d",
                }
            );

            await new Token({ token: refreshToken }).save();
            return refreshToken;
        } catch (error) {
            console.error(error);
            return;
        }
    },
};


userSchema.pre("save", async function (next) {
    try {
        let salt = await bcrypt.genSalt(12); // generate hash salt of 12 rounds
        let hashedPassword = await bcrypt.hash(this.password, salt); // hash the current user's password
        this.password = hashedPassword;
    } catch (error) {
        console.error(error);
    }
    return next();
});

module.exports = mongoose.model("User", userSchema);

