import { TransactionController } from "../modules/entities/transactions/controllers/TransactionController";
import { validateAuthentication as authMidlleware } from "../middlewares/validateAuthentication";
import { Router } from "express";

const transactionController = new TransactionController()

const transactionRoutes = Router();

transactionRoutes.get('/myTransactions',authMidlleware, transactionController.search)

transactionRoutes.post('/new', authMidlleware, transactionController.create)

export { transactionRoutes }