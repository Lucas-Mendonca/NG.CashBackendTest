import { Router } from "express";
import { validateAuthentication as authMidlleware } from "../middlewares/validateAuthentication";
import { CreateTransactionController } from "../modules/entities/transactions/controllers/createTransactionController";
import { FindTransactionsController } from "../modules/entities/transactions/controllers/findTransactionController";



const createTransactionController = new CreateTransactionController()
const findTransactionController = new FindTransactionsController()

const transactionRoutes = Router();

transactionRoutes.post('/new', authMidlleware, createTransactionController.handle)

transactionRoutes.get('/myTransactions',authMidlleware, findTransactionController.handle)

export { transactionRoutes }