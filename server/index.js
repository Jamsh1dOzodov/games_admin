const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();
const userRouter = require('./routes/UserRoute');
const authRouter = require('./routes/AuthRoute');
const apiRouter = require('./routes/ApiRoute');
const adminRouter = require('./routes/AdminRoute');
const path = require('path')


const app = express();

const urlEncodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json(), urlEncodedParser)
app.use('/uploads', express.static('uploads'));

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'GamesAndSoft'
}).then(res => {
	app.listen(process.env.PORT, () => console.log(`server started in port: ${process.env.PORT}`))
}).catch(err => console.log(err))



app.use('/api', userRouter);
app.use('/api', apiRouter);
app.use('/api', authRouter);
app.use('/secret', adminRouter)