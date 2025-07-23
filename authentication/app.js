import express from 'express';
import AuthRouter from './routes/authRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


app.use('/auth',AuthRouter);

app.listen(8081,()=>{
    console.log("Port 8081");
})
