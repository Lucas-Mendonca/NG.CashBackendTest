import tokenSecretHash from "../../../../../shared/env";
import appError from "../../../../error/appErrors";

import { IUserRepository } from "../../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken'
import { compare } from "bcrypt";

interface IRequest {
    username: string,
    password: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor (
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}
    async execute({ username, password }:IRequest): Promise<Object> {

        const user = await this.UserRepository.findUserByUsername(username)
        
        if(!user) {
            throw new appError('Username or Password is incorrect');
        };
        
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new appError('Username or Password is incorrect');
        };

        const token = sign({}, tokenSecretHash,{
            subject: user.id,
            expiresIn: "24h"
        })

        return {
            user: {
                username
            },
            token
        }
    }
}

export { AuthenticateUserUseCase }