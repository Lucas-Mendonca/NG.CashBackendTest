import getIdFromToken from "../../../functions/getIdFromToken";
import tokenSecretHash from "../../../../../shared/env";

import { CreateTransactionUseCase } from "../useCases/createTransactionUseCase";
import { FindTransactionsUseCase } from "../useCases/findTransactionsUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";


export class TransactionController {
    async create(request: Request, response: Response):Promise<Response> {
        const { credited_user, value } = request.body;
        const tokenHash = response.locals.userToken

        const token = await getIdFromToken(tokenHash, tokenSecretHash)
        if(!token) { return response.status(400).json() }

        const createTransactionUseCase = container.resolve(CreateTransactionUseCase);
        const result = await createTransactionUseCase.execute({ 
            debited_user: token, 
            credited_user, 
            value 
        })

        return response.status(201).json(result);
    }

    async search(request: Request, response: Response):Promise<Response> {
        const { searchMethod, from, to } = request.body;
        const tokenHash = response.locals.userToken
        
        const token = await getIdFromToken(tokenHash, tokenSecretHash)
        if(!token) { return response.status(500).json() }

        const findTransactionsUseCase = container.resolve(FindTransactionsUseCase);
        const result = await findTransactionsUseCase.execute({
            userId: token,
            searchMethod,
            from,
            to,
        })

        return response.status(201).json(result);
    }
    
}