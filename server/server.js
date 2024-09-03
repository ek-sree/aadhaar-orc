import express from "express";
import cors from 'cors';
import { config } from "./app/config/config.js";
import router from "./app/router/route.js";
import { limiter } from "./app/utils/rateLimitter.js";

const app = express();

app.use(cors({
    origin: config.CORS_URL,
    credentials: true
}));

app.use(express.json());
app.use(limiter);

app.use('/', router);

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});