import { Request, Response } from "express";
import { container } from "tsyringe";
import { getIdFromToken } from "../../../functions/getIdFromToken.function";
import { CreateTransactionUseCase } from "../useCases/createTransactionUseCase";



export class CreateTransactionController {
    async handle(request: Request, response: Response):Promise<Response> {
        const { credited_user, value } = request.body;
        const authCode = request.headers.authorization;
        if(!authCode || !process.env.TOKEN_SECRET_HASH) {
            return response.status(400).json()
        }
        const [, tokenHash] = authCode.split(" ");
        
        const token = await getIdFromToken(tokenHash, process.env.TOKEN_SECRET_HASH)
        if(!token) { return response.status(400).json() }

        const createTransactionUseCase = container.resolve(CreateTransactionUseCase);
        const result = await createTransactionUseCase.execute({ 
            debited_user: token, 
            credited_user, 
            value 
        })

        return response.status(201).json(result);
    }
}