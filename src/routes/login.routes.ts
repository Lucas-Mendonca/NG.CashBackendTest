import { Request, Response, Router } from "express";
import { AuthenticateUserController } from "../modules/entities/users/controllers/authenticateUserController";

const loginRoute = Router();

const authenticateUserController = new AuthenticateUserController()

loginRoute.post('/login', authenticateUserController.handle)

export { loginRoute };