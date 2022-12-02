import appError from "../../../../error/appErrors";

import { inject, injectable } from "tsyringe";
import { ITransactionDTO } from "../../../dtos/ITransactionDTO";
import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { ITransactionRepository } from "../../../repositories/ITransactionRepository";


interface IRequest {
    from?: string,
    to?: string,
    userId: string,
    searchMethod: string
}

@injectable()
export class FindTransactionsUseCase {
    constructor(
        @inject('TransactionRepository')
        private TransactionRepository: ITransactionRepository,
        @inject('AccountRepository')
        private AccountRepository: IAccountRepository,
    ) {}
    async execute(data: IRequest):Promise<ITransactionDTO[]> {
        const account = await this.AccountRepository.findByUserId(
            data.userId
            )

        let transactions: ITransactionDTO[]

        switch (data.searchMethod) {
            case 'all':

                transactions = await this.TransactionRepository
                .findManyByAccountId(
                    account.id
                )

                return transactions

            case 'cash-in':

                transactions = await this.TransactionRepository
                .findManyByCashIn(
                    account.id
                )

                return transactions

            case 'cash-out':

                transactions = await this.TransactionRepository
                .findManyByCashOut(
                    account.id
                )

                return transactions

            case 'date':

                if(!data.from || !data.to) {
                    throw new appError('No dates found in the request')
                }

                transactions = await this.TransactionRepository
                .findManyByDateRange(
                    account.id,
                    data.from,
                    data.to
                )

                return transactions

            default:
                throw new appError(`Invalid search method, "${data.searchMethod}" is not a valid search method`, 405)
        }    
    }
}