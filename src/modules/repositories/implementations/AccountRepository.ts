import { Decimal } from "@prisma/client/runtime";
import { v4 as uuidV4 } from "uuid";
import { prisma } from "../../../database/prismaClient";
import { appError } from "../../../error/appErrors";
import { IAccountDTO } from "../../dtos/IAccountDTO";
import { IUserDTO } from "../../dtos/IuserDTO";
import { IAccountRepository } from "../IAccountRepository";



export class AccountRepository implements IAccountRepository {
    async findById(id: string): Promise<IAccountDTO> {
        const account: IAccountDTO | null = await prisma.account.findUnique({
            where: { id }
        })

        if(!account) {
            throw new appError("Account does not exist")
        }

        return account
    }
    async findByUserId(id: string): Promise<IAccountDTO> {
        const accountId = await prisma.user.findUnique({
            where: { id }
        }) as IUserDTO | null;

        if(!accountId) {
            throw new appError("User does not exist")
        }

        const account: IAccountDTO | null = await prisma.account.findUnique({
            where: { id: accountId.accountId }
        })

        if(!account) {
            throw new appError("Account does not exist")
        }

        return account
    }

    async findByUserUsername(username: string): Promise<IAccountDTO> {
        const accountId = await prisma.user.findUnique({
            where: { username }
        }) as IUserDTO | null;

        if(!accountId) {
            throw new appError("User does not exist")
        }

        const account: IAccountDTO | null = await prisma.account.findUnique({
            where: { id: accountId.accountId }
        })

        if(!account) {
            throw new appError("Account does not exist")
        }

        return account
    }

    async getBalance(id: string): Promise<Decimal> {

        const account: IAccountDTO | null = await prisma.account.findUnique({
            where: { id }
        })

        if(!account) {
            throw new appError("Account does not exist")
        }

        return account.balance
    }

    async create():Promise<IAccountDTO> {
        const account = await prisma.account.create({
            data: {
                id: uuidV4(),
                balance: 100.00,
                cred_transactions: { create: { id: uuidV4() }},
                deb_transactions: { create: { id: uuidV4() }}
            }
        }) as IAccountDTO

        return account
    }
}