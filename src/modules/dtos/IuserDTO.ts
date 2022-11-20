import { Decimal } from "@prisma/client/runtime";

export interface IUserDTO {
    id: string;
    username: string;
    password: string;
    accountId?: string;

    account?: {
        id: string
        balance: Decimal
    }
}