import { Router } from "express";
import { validateAuthentication as authMidlleware} from "../middlewares/validateAuthentication";
import { AccountController } from "../modules/entities/accounts/controllers/AccountController";


const accountController = new AccountController();

const accountRoutes = Router();

accountRoutes.get('/balance', authMidlleware, accountController.checkBalance);

accountRoutes.post('/register', accountController.create);
accountRoutes.post('/login', accountController.authenticate);

export { accountRoutes }