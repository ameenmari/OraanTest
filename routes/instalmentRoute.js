import express from 'express';
import User from '../models/userModel'
import Instalment from '../models/instalmentModel';
import { instalmentValidation } from '../validation'

const router = express.Router();


router.post('/saveinstalment', async (req, res) => {


    const { error } = instalmentValidation(req.body)
    if (error) {
        return res.status(406).send(error.details[0].message);
    }

    const userExist = await User.findOne({ _id: req.body.userId });
    if (!userExist) return res.status(404).send("user does not exist..");

    const instalment = new Instalment({

        userId: req.body.userId,
        paymentDate: Date.now(),
        instalmentDate: Date.now(),
        instalmentAmount: req.body.instalmentAmount,
        paymentMethod: req.body.paymentMethod

    });
    const savedInstalment = await instalment.save();

    if (savedInstalment) {
        return res.send({
            message: "instalment paid",
        });
    } else {
        return res.status(406).send({ message: 'Invalid instalment Data.' });
    }
});

router.post('/totalInstalments', async (req, res) => {

    const userExist = await User.findOne({ _id: req.body.userId });
    if (!userExist) return res.status(404).json({ message: "user does not exist.." });

    const totalinstalment = await Instalment.find({ userId: req.body.userId });
    if (!totalinstalment) return res.status(404).send("No instalments paid..");

    let sum = 0;
    totalinstalment.forEach(instalmentAmount => {
        sum += Number(instalmentAmount['instalmentAmount']);
    });

    if (sum) return res.status(200).json({ total: sum })

    else {
        return res.status(400).send({ message: 'Invalid instalment Data' });
    }
});
export default router;

