

import express from 'express';
import User from '../models/userModel';
import { signinValidation, registerValidation } from '../validation'
import bcrypt from 'bcryptjs'

const router = express.Router();

router.post('/signin', async (req, res) => {
    const { error } = signinValidation(req.body)

    if (error) {
        return res.status(403).send(error.details[0].message);
    }

    const user = await User.findOne({ number: req.body.number });
    if (!user) return res.status(404).send("user does not exist..");
    const password = bcrypt.compareSync(req.body.password, user['password'])
    if (!password) return res.status(404).send("wrong password..try again");

    if (password) {
        res.send({
            _id: user['_id'],

        });
    } else {
        return res.status(404).send({ message: 'Invalid Email or Password.' });
    }
});

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(403).send(error.details[0].message);
    }
    const numberExist = await User.findOne({ number: req.body.number });
    if (numberExist) return res.status(406).send("number already exist..");
    const salt = await bcrypt.genSalt(10);

    let passwordHash = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        number: req.body.number,
        name: req.body.name,
        password: passwordHash,
    });

    const newUser = await user.save();
    if (newUser) {
        return res.send({
            _id: newUser.id,
        });
    } else {
        return res.status(406).send({ message: 'Invalid User Data.' });
    }
});

export default router;


