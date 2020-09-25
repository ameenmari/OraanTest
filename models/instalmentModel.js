/* eslint-disable no-undef */

import mongoose from 'mongoose';

const instalmentSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentDate: { type: Date, required: true },
    instalmentDate: { type: Date, required: true },
    instalmentAmount: { type: String, required: true },
    paymentMethod: { type: String, required: true, max: 30 },

});

const instalmentModel = mongoose.model('instalments', instalmentSchema);
export default instalmentModel;

