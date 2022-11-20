import { Decimal } from "@prisma/client/runtime"

export interface ITransactionDTO {
    id?: string,
    value: Decimal
    created_at: Date
    debitedAccountID?:   String
    creditedAccountID?:  String
}