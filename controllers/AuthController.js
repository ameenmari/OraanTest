import User from "../models/user.model";
import Token from "../models/token.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinValidation, registerValidation } from '../validation'


const ACCESS_TOKEN_SECRET = '9a6aed9cfd98a6fba3ef38b4c120ad0a8fd441c8c911c97fdfbcd51c6d879ae6149743a802cbea1bdd0701eabf77062ba3e89e61f28472914c16fb47e49cada5';
const REFRESH_TOKEN_SECRET = '988f2aa64c7008d8abd4b4f11019849b549a017af7722d2548d6b864e1e2f739df0c4aff30a62b5a71c2b9be22e3df2e309b3e2ebae0f26e65dbc6585614a7a4';

exports.signup = async (req, res) => {

    const { error } = registerValidation(req.body)

    if (error) {
        return res.status(403).send(error.details[0].message);
    }


    try {

        let user = await User.findOne({ number: req.body.number });

        if (user) {
            return res.status(400).json({ error: " Account already exist" });
        } else {


            user = await new User(req.body).save();
            let accessToken = await user.createAccessToken();
            let refreshToken = await user.createRefreshToken();


            const id = user['']

            return res.status(201).json({ accessToken, refreshToken, id });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};


exports.login = async (req, res) => {

    const { error } = signinValidation(req.body)

    if (error) {
        return res.status(403).send(error.details[0].message);
    }

    try {
        let user = await User.findOne({ number: req.body.number });
        if (!user) {
            return res.status(404).json({ error: "No user found!" });
        } else {
            let valid = await bcrypt.compare(req.body.password, user.password);
            if (valid) {
                let accessToken = await user.createAccessToken();
                let refreshToken = await user.createRefreshToken();

                return res.status(201).json({ accessToken, refreshToken });
            } else {
                return res.status(401).json({ error: "Invalid password!" });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};
exports.generateRefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(403).json({ error: "Access denied,token missing!" });
        } else {
            const tokenDoc = await Token.findOne({ token: refreshToken });
            if (!tokenDoc) {
                return res.status(401).json({ error: "Token expired!" });
            } else {
                const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
                const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
                    expiresIn: "10m",
                });
                return res.status(200).json({ accessToken });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await Token.findOneAndDelete({ token: refreshToken });
        return res.status(200).json({ success: "User logged out!" });
    } catch (error) {
        console.error(error); l;
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};
