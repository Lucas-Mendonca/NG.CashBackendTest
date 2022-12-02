import { container } from 'tsyringe'

import { IAccountRepository } from '../../src/modules/repositories/IAccountRepository'
import { AccountRepository } from '../../src/modules/repositories/implementations/AccountRepository'
import { TransactionRepository } from '../../src/modules/repositories/implementations/TransactionRepository'
import { UserRepository } from '../../src/modules/repositories/implementations/UserRepository'
import { ITransactionRepository } from '../../src/modules/repositories/ITransactionRepository'
import { IUserRepository } from '../../src/modules/repositories/IUserRepository'

container.registerSingleton<IAccountRepository>(
    "AccountRepository",
    AccountRepository
)

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
)

container.registerSingleton<ITransactionRepository>(
    "TransactionRepository",
    TransactionRepository
)