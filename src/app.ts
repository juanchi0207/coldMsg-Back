// src/app.ts
import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

import express from 'express';
import generateRouter from './routes/generate';

const app = express();
app.use(express.json());
app.use('/generate', generateRouter); 

export default app;
