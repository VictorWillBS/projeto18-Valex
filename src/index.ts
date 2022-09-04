import cors from 'cors';
import dotenv from 'dotenv'
import 'express-async-errors'
import express,{json} from 'express';
import cardRoute from './routes/cardRoute';
import rechargeRoute from './routes/rechargeRoute';
import errorHandle from '../utils/errorFunctions/errorHandle';
dotenv.config();
const app = express();

app.use(cors());
app.use(json());
app.use(cardRoute);
app.use(rechargeRoute)
app.use(errorHandle);

const PORT = process.env.PORT;
app.listen(PORT,()=> console.log(`Servidor rodando na porta ${PORT}`));