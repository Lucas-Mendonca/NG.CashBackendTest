import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { prisma } from "../../../database/prismaClient";
import { IUserDTO } from "../../dtos/IuserDTO";
import { IUserRepository } from "../IUserRepository";


export class UserRepository implements IUserRepository {
    async findUserById(id: string): Promise<IUserDTO | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        }) as IUserDTO | null

        if(!user) {
            return null
        }

        return user
    }
    async findUserByUsername(username: string): Promise<IUserDTO | null> {
        const user = await prisma.user.findUnique({
            where: { username }
        }) as IUserDTO | null

        if(!user) {
            return null
        }

        return user
    }
    async connectToAccount(id: string, accountId: string): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: {
                accountId
            }
        })
    }
    async create(username:string, password:string):Promise<IUserDTO> {
        const passwordHash = await hash(password, 10)

        const user = await prisma.user.create({
            data: {
                id: uuidV4(),
                username,
                password: passwordHash
            }
        }) as IUserDTO

        return user
    }
}