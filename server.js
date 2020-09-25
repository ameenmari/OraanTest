

import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import userRoute from './routes/userRoute';
import instalmentRoute from './routes/instalmentRoute';

const mongodbUrl = config.MONGODB_URL;
mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(res => console.log('db connected...'))
    .catch((error) => console.log(error.reason));

const app = express();

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/instalments', instalmentRoute);


app.listen(config.PORT, () => {
    console.log('Server started at http://localhost:5000');
});