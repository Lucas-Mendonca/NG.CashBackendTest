/*
  Warnings:

  - You are about to drop the `creditedTransactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `debitedTransactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "creditedTransactions" DROP CONSTRAINT "creditedTransactions_accountId_fkey";

-- DropForeignKey
ALTER TABLE "debitedTransactions" DROP CONSTRAINT "debitedTransactions_accountId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_creditedAccountID_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_debitedAccountID_fkey";

-- DropTable
DROP TABLE "creditedTransactions";

-- DropTable
DROP TABLE "debitedTransactions";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_debitedAccountID_fkey" FOREIGN KEY ("debitedAccountID") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_creditedAccountID_fkey" FOREIGN KEY ("creditedAccountID") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
