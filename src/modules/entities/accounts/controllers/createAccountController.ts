import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAccountUseCase } from "../useCases/createAccountUseCase";


export class CreateAccountController {
    async handle(request: Request, response: Response):Promise<Response> {
        const { username, password } = request.body;

        const createAccountUseCase = container.resolve(CreateAccountUseCase);
        const user = await createAccountUseCase.execute({ username, password });

        return response.status(201).json(user)
    }
}