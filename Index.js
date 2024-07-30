import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/User.js"
import authRouter from "./routes/Auth.js"
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

app.use('/server/user', userRouter)
app.use('/server/auth', authRouter);