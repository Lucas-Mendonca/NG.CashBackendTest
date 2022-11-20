import { Request, Response } from "express";
import { container } from "tsyringe";
import { getIdFromToken } from "../../../functions/getIdFromToken.function";
import { FindTransactionsUseCase } from "../useCases/findTransactionsUseCase";



export class FindTransactionsController {
    async handle(request: Request, response: Response):Promise<Response> {
        const { searchMethod, from, to } = request.body;
        const authCode = request.headers.authorization;
        if(!authCode || !process.env.TOKEN_SECRET_HASH) {
            return response.status(401).json()
        }
        const [, tokenHash] = authCode.split(" ");
        
        const token = await getIdFromToken(tokenHash, process.env.TOKEN_SECRET_HASH)
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