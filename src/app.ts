import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
