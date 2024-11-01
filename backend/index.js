import express, { request, response } from 'express'
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import articleRoute from './routes/articleRoute.js'
import commentRoute from './routes/commentRoute.js'
import followRoute from './routes/followRoute.js'
import likeRoute from './routes/likeRoute.js'
import notifyRoute from './routes/notifyRoute.js'
import fileRoute from './routes/fileRoutes.js'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'DHKPT Social API',
            version: '1.0.0',
            description: 'API documentation for my app',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome myPage")
})

app.use('/users',userRoute);
app.use('/articles',articleRoute);
app.use('/comments',commentRoute);
app.use('/follows',followRoute);
app.use('/likes',likeRoute);
app.use('/notifications',notifyRoute);
app.use('/files',fileRoute);
//
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:1324',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
mongoose.connect(mongoDBURL)
.then(() => {
    console.log(`Connect to database!`);
    app.listen(PORT,() => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});
