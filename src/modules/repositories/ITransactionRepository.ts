import { IAccountDTO } from "../dtos/IAccountDTO";
import { ITransactionDTO } from "../dtos/ITransactionDTO";


export interface ITransactionRepository {
    findManyByAccountId(id:string):Promise<ITransactionDTO[]>
    findManyByCashIn(id:string):Promise<ITransactionDTO[]>
    findManyByCashOut(id:string):Promise<ITransactionDTO[]>
    findManyByDateRange(id:string, from:string, to:string):Promise<ITransactionDTO[]>
    create(debitedAccountID:string, creditedAccountID:string, value:number):Promise<ITransactionDTO>
    updateBalance(id:string, value:number, isChashIn:boolean):Promise<IAccountDTO>
}