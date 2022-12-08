import getIdFromToken from "../modules/functions/getIdFromToken";
import tokenSecretHash from "../../shared/env";
import appError from "../error/appErrors";

import { NextFunction, Request, Response } from "express";

export async function validateAuthentication(
    request: Request,
    response: Response,
    next: NextFunction
) {
    
    const authHeaderToken = request.headers.authorization;

    if(!authHeaderToken) {
        throw new appError('Token missing', 401);
    };

    const [, token] = authHeaderToken.split(" ");

    const user = await getIdFromToken(token ,tokenSecretHash)

    response.locals.userId = user
    next();
};