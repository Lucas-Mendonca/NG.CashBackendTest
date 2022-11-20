import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";
import { appError } from "../error/appErrors";
import { getIdFromToken } from "../modules/functions/getIdFromToken.function";


interface IPayload {
    sub: string
};


export async function validateAuthentication(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeaderToken = request.headers.authorization;

    if(!authHeaderToken) {
        throw new appError('Token missing', 401);
    };

    if(!process.env.TOKEN_SECRET_HASH) {
        throw new appError('Could not verify Token', 500);
    }

    const [, token] = authHeaderToken.split(" ");
    try {
        const { sub } = verify(token, process.env.TOKEN_SECRET_HASH) as IPayload;

        const user = await getIdFromToken(token ,process.env.TOKEN_SECRET_HASH)
        if(!user){
            throw new appError('User does not exist', 401);
        };

        next();
    } catch {
        throw new appError('Invalid Token', 401)
    }

};