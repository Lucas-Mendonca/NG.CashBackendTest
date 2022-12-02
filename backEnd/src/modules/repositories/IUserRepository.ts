import { IUserDTO } from "../dtos/IuserDTO";


export interface IUserRepository {
    findUserById(id:string):Promise<IUserDTO | null>
    findUserByUsername(username:string):Promise<IUserDTO | null>
    connectToAccount(id:string, accountId:string):Promise<void>
    create(username:string, password:string):Promise<IUserDTO>
}