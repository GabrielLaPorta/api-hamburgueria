import express from 'express';
import logging from './src/config/logging';
import config from './src/config/config';
import userRoutes from './src/routes/user';
import loginRoutes from './src/routes/login';
import burgerRoutes from './src/routes/burger';
import burgerIngredientRoutes from './src/routes/burger-ingredient';

import { dbCreateConnection } from './createConnection';
import cors from 'cors';

const NAMESPACE = 'Server';
const app = express();

declare global {
    namespace Express {
        interface Request {
            user: {
                username: string;
                userId: string;
                email: string;
                role: string;
            };
        }
    }
}

app.use(cors());
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
app.use(userRoutes);
app.use(loginRoutes);
app.use(burgerRoutes);
app.use(burgerIngredientRoutes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

app.listen(config.server.port, () => {
    console.log(`${config.server.hostname} rodando na porta ${config.server.port}`);
});
(async () => {
    await dbCreateConnection();
})();
