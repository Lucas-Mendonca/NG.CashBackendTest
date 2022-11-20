import { Router } from "express";
import { CreateAccountController } from "../modules/entities/accounts/controllers/createAccountController";



const registerRoute = Router();

const createAccountController = new CreateAccountController();

registerRoute.post('/', createAccountController.handle);

export { registerRoute }