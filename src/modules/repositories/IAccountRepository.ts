import { Decimal } from "@prisma/client/runtime"
import { IAccountDTO } from "../dtos/IAccountDTO"

export interface IAccountRepository {
    findById(id: string):Promise<IAccountDTO>
    findByUserId(id: string):Promise<IAccountDTO>
    getBalance(id: string):Promise<Decimal>
    create():Promise<IAccountDTO>
    findByUserUsername(username: string):Promise<IAccountDTO>
}