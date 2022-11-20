import { Request, Response } from "express";
import { container } from "tsyringe";
import { getIdFromToken } from "../../../functions/getIdFromToken.function";
import { CheckBalanceUseCase } from "../useCases/checkBalanceUseCase";




export class CheckBalanceController {
    async handle(request: Request, response: Response):Promise<Response> {
        const authCode = request.headers.authorization;
        if(!authCode || !process.env.TOKEN_SECRET_HASH) {
            return response.status(400).json()
        }
        const [, tokenHash] = authCode.split(" ");
        
        const token = await getIdFromToken(tokenHash, process.env.TOKEN_SECRET_HASH)
        if(!token) { return response.status(400).json() }

        const checkBalanceUseCase = container.resolve(CheckBalanceUseCase);
        const result = await checkBalanceUseCase.execute(token)

        return response.status(201).json(result);
    }
}