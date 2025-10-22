

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const Connection = mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err))


export {Connection};