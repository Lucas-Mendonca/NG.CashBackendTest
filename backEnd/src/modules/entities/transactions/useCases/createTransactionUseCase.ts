import appError from "../../../../error/appErrors";

import { ITransactionRepository } from "../../../repositories/ITransactionRepository";
import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
    debited_user: string,
    credited_user: string,
    value: number,
}

@injectable()
export class CreateTransactionUseCase {
    constructor (
        @inject('TransactionRepository')
        private TransactionRepository: ITransactionRepository,
        @inject('AccountRepository')
        private AccountRepository: IAccountRepository
    ) {}
    async execute({ debited_user, credited_user, value }: IRequest): Promise<object> {

        const debitedAccount = await this.AccountRepository.findByUserId(debited_user);
        const creditedAccount = await this.AccountRepository.findByUserUsername(credited_user);

        if(debitedAccount.id == creditedAccount.id) {
            throw new appError('The debited account and credited account connot be equal')
        };

        await this.TransactionRepository.updateBalance(
            debitedAccount.id, 
            value,
            false
        );

        await this.TransactionRepository.updateBalance(
            creditedAccount.id, 
            value,
            true
        );
        
        const transaction = await this.TransactionRepository.create(
            debitedAccount.id,
            creditedAccount.id,
            value
        )

        return transaction
    }
}