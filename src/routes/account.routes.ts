import { Router } from "express";
import { validateAuthentication as authMidlleware} from "../middlewares/validateAuthentication";
import { CheckBalanceController } from "../modules/entities/accounts/controllers/checkBalanceController";


const checkBalanceController = new CheckBalanceController();

const accountRoutes = Router()

accountRoutes.get('/balance', authMidlleware, checkBalanceController.handle)

export { accountRoutes }