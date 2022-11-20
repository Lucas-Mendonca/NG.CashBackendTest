import { verify } from "jsonwebtoken";
import { prisma } from "../../database/prismaClient";

interface ITokenId {
    sub: string
}


export async function getIdFromToken(
    token: string, 
    secret: string):Promise<string | undefined> 
{
    const { sub } = verify(token, secret) as ITokenId;

    const user = await prisma.user.findUnique({ where: { id: sub } });

    return user?.id
}