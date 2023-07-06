import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoose } from './util/connectMongoose.js';
import recipeRouter from './routes/recipeRoutes.js';


const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(recipeRouter)

if (await connectMongoose()) {
  app.listen(PORT, () => {
    console.log(`Verbunden an Port ${PORT}`);
  });
} else {
  console.error('Verbindung zu mongodb nicht möglich.');
}