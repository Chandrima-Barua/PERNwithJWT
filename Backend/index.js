import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./models/index.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
await db.sequelize.sync();
// db.sequelize.sync({force: true});
try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

app.use(express.urlencoded({ extended: true }));
    
app.use(cors({ credentials:true, origin: process.env.FRONTEND_URL }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
    response.json({ info: 'Backends of Service Panel' })
})
app.listen(process.env.BACKEND_PORT, ()=> console.log('Server running at port', process.env.BACKEND_PORT));
