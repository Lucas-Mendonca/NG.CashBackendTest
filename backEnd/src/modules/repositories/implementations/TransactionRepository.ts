import { Decimal } from "@prisma/client/runtime";
import { v4 as uuidV4 } from "uuid";
import { prisma } from "../../../database/prismaClient";
import { IAccountDTO } from "../../dtos/IAccountDTO";
import { ITransactionDTO } from "../../dtos/ITransactionDTO";
import { ITransactionRepository } from "../ITransactionRepository";


export class TransactionRepository implements ITransactionRepository {

    async findManyByAccountId(id: string): Promise<ITransactionDTO[]> {
        const transactions = await prisma.transaction.findMany({
            where: { OR: [
                { creditedAccountID: id },
                { debitedAccountID: id }
            ]}
        }) as ITransactionDTO[]

        return transactions
    }

    async findManyByCashIn(id: string): Promise<ITransactionDTO[]> {
        const transactions = await prisma.transaction.findMany({
            where: {
                creditedAccountID: id              
            }
        }) as ITransactionDTO[]

        return transactions
    }

    async findManyByCashOut(id: string): Promise<ITransactionDTO[]> {
        const transactions = await prisma.transaction.findMany({
            where: {
                debitedAccountID: id              
            }
        }) as ITransactionDTO[]

        return transactions
    }

    async findManyByDateRange(id: string, from: string, to: string):Promise<ITransactionDTO[]> {
        const transactions = await prisma.transaction.findMany({
            where: {
                created_at: {
                    lte: new Date(to),
                    gte: new Date(from)
                },
                OR: [
                    { creditedAccountID: id },
                    { debitedAccountID: id }
                ]
            }
        }) as ITransactionDTO[]

        return transactions
    }
    
    async create(debitedAccountID: string, creditedAccountID: string, value: number): Promise<ITransactionDTO> {
        const transaction = await prisma.transaction.create({
            data: {
                id: uuidV4(),
                creditedAccountID,
                debitedAccountID,
                value
            }
        }) as ITransactionDTO

        return transaction
    }
    async updateBalance(id:string, value: number, isChashIn: boolean):Promise<IAccountDTO> {
        if(value < 0 || value == 0) {
            throw new Error("value must be highier then 0")
        };

        const account: IAccountDTO | null = await prisma.account.findUnique({ where: { id } })

        if(!account) {
            throw new Error('Could not find a account')
        }
        
        const balance = account.balance
        let newBalance: Decimal
        
        if(balance.lessThan(value)) {
            throw new Error('Insuficient funds')
        }

        if(isChashIn) {
            newBalance = Decimal.sum(balance, value); 
        } else {
            newBalance = Decimal.sum(balance, value * -1); 
        }

        const result:IAccountDTO = await prisma.account.update({
            where: { id },
            data: {
                balance: newBalance
            }
        })

        return result
    }

}