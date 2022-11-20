import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from '../useCases/authenticateUserUseCase';


export class AuthenticateUserController {
    async handle (request: Request, response: Response):Promise<Response> {
        const { username, password } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
        const token = await authenticateUserUseCase.execute({ username, password });

        return response.status(201).json(token);
    }
}