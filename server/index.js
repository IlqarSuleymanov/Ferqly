import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.send({ message: 'Hello from DALL-E!' });
    });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})