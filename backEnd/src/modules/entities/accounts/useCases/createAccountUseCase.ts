import appError from "../../../../error/appErrors";

import { checkIfPassowordIsValidy } from "../../../functions/passwordCheck.function";
import { checkIfUsernameIsValidy } from "../../../functions/usernameCheck.function";
import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { injectable, inject } from 'tsyringe'

interface IRequest {
    username: string,
    password: string
};

@injectable()
export class CreateAccountUseCase {
    constructor (
        @inject('AccountRepository')
        private AccountRepository: IAccountRepository,
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}
    async execute({ username, password }: IRequest):Promise<object> {

        const usernameIsValidy = checkIfUsernameIsValidy(username);
        if (!usernameIsValidy) {
            throw new appError(`The following username is invalid: ${username}`);
        };

        const passwordIsValidy = checkIfPassowordIsValidy(password);
        if (!passwordIsValidy) {
            throw new appError(`The following password is invalid: ${password}`);
        };

        const userAlreadyExist = await this.UserRepository.findUserByUsername(username)
        if(userAlreadyExist) { 
            throw new appError('User already exist');
        };

        const account = await this.AccountRepository.create();
        const user = await this.UserRepository.create(username, password);
        await this.UserRepository.connectToAccount(user.id, account.id);

        return {
            userId: user.id,
            username,
            accountId: account.id,
            balance: account.balance
        }
    };
};