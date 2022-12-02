import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";



@injectable()
export class CheckBalanceUseCase {
    constructor (
        @inject('AccountRepository')
        private AccountRepository:IAccountRepository,
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}
    async execute(id:string):Promise<object> {
        const account = await this.AccountRepository.findByUserId(id);
        const user = await this.UserRepository.findUserById(id);

        const returnJson = {
            user: user?.username,
            balance: account.balance
        };

        return returnJson
    }
}