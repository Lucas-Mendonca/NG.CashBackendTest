import { Router } from "express";
import { validateAuthentication as authMidlleware } from "../middlewares/validateAuthentication";
import { TransactionController } from "../modules/entities/transactions/controllers/TransactionController";

const transactionController = new TransactionController()

const transactionRoutes = Router();

transactionRoutes.get('/myTransactions', authMidlleware, transactionController.search)

transactionRoutes.post('/new', authMidlleware, transactionController.create)

export { transactionRoutes }