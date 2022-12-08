import appError from "../../error/appErrors";

import { prisma } from "../../database/prismaClient";
import { verify } from "jsonwebtoken";

interface ITokenId {
    sub: string
}

export default async function getIdFromToken(
    token: string, 
    secret: string
):Promise<string> 

{

    const { sub } = verify(token, secret) as ITokenId;

    const user = await prisma.user.findUnique({ where: { id: sub } });

    if(!user) {
        throw new appError('Invalid Token', 401)
    }

    return user.id
}