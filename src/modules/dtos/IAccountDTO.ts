import { Decimal } from "@prisma/client/runtime";

export interface IAccountDTO {
    id: string,
    balance: Decimal
}