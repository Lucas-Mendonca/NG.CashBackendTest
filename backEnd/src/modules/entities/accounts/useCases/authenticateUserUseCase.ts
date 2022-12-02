import appError from "../../../../error/appErrors";

import { IUserRepository } from "../../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken'
import { compare } from "bcrypt";

interface IRequest {
    username: string,
    password: string
}

interface IResponse {
    user: {
        username: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor (
        @inject('UserRepository')
        private UserRepository: IUserRepository
    ) {}
    async execute({ username, password }:IRequest): Promise<IResponse> {

        const user = await this.UserRepository.findUserByUsername(username)

        if(!user) {
            throw new appError('Username or Password is incorrect');
        };

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new appError('Username or Password is incorrect');
        };

        if(!process.env.TOKEN_SECRET_HASH) {
            throw new appError('Could not generate Token', 500)
        }

        const token = sign({}, process.env.TOKEN_SECRET_HASH,{
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