import getIdFromToken from "../../../functions/getIdFromToken";
import tokenSecretHash from "../../../../../shared/env";

import { AuthenticateUserUseCase } from "../useCases/authenticateUserUseCase";
import { CreateAccountUseCase } from "../useCases/createAccountUseCase";
import { CheckBalanceUseCase } from "../useCases/checkBalanceUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";


export class AccountController {
    
    async checkBalance(request: Request, response: Response):Promise<Response> {
        const tokenHash = response.locals.userToken
        
        const token = await getIdFromToken(tokenHash, tokenSecretHash)

        const checkBalanceUseCase = container.resolve(CheckBalanceUseCase);
        const result = await checkBalanceUseCase.execute(token)

        return response.status(201).json(result);
    }

    async create(request: Request, response: Response):Promise<Response> {
        const { username, password } = request.body;

        const createAccountUseCase = container.resolve(CreateAccountUseCase);
        const user = await createAccountUseCase.execute({ username, password });

        return response.status(201).json(user)
    }

    async authenticate(request: Request, response: Response):Promise<Response> {
        const { username, password } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
        const token = await authenticateUserUseCase.execute({ username, password });

        return response.status(201).json(token);
    }
}