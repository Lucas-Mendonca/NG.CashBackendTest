import "reflect-metadata"
import Express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import "../shared/containers"
import mongoSanitize from 'express-mongo-sanitize';
import Helmet from 'helmet';
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json";

import { appError } from "./error/appErrors";
import { loginRoute } from "./routes/login.routes";
import { registerRoute } from "./routes/register.routes";
import { transactionRoutes } from "./routes/transaction.routes";
import { accountRoutes } from "./routes/account.routes";


const port = 3333;
const app = Express();

app.use(Express.json());

app.use(Helmet())
app.use(mongoSanitize())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/register', registerRoute)
app.use('/', loginRoute)
app.use('/user', accountRoutes)
app.use('/user/transaction', transactionRoutes)


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof appError) {
        return response.status(err.errorCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        errorCode: 'error',
        message: `Internal server error :: ${err.message}`
    })
})

app.listen(port)
console.log(`App running at port: ${port}`)