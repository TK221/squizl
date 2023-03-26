import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AccountModel } from '../models/account.model';
import { HttpError } from '../models/http-error.model';
import { Result, fail, success } from '../models/result.model';

const prisma = new PrismaClient();
const salt = isNaN(Number(process.env.ENCRYPT_SALT)) ? 10 : Number(process.env.ENCRYPT_SALT);

export async function createAccount (name: string, password: string): Promise<Result<AccountModel>> {
    try {
        const passwordEncrypted = await bcrypt.hash(password, salt);

        const account = await prisma.account.create({
            data: {
                name: name,
                password: passwordEncrypted
            }
        });

        return success(new AccountModel(account.id, account.name));
    } catch (err) {
        return fail(new HttpError('Failed to create account', 500));
    }
}

export async function getAccount (accountId: number): Promise<Result<AccountModel>> {
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        });

        if (account) return success(new AccountModel(account.id, account.name));
        else return fail(new HttpError('Account does not exist', 404));
    } catch (err) {
        return fail(new HttpError('Failed to get account', 500));
    }
}

export async function deleteAccount (accountId: number): Promise<Result<AccountModel>> {
    try {
        const account = await prisma.account.delete({
            where: {
                id: accountId
            }
        });

        if (account) return success(new AccountModel(account.id, account.name));
        else return fail(new HttpError('Account does not exist', 404));
    } catch (err) {
        return fail(new HttpError('Failed to delete account', 500));
    }
}

export async function verifyAccount (loginName: string, password: string): Promise<Result<AccountModel>> {
    try {
        const account = await prisma.account.findFirst({
            where: {
                name: loginName
            }
        });
        if (!account) return fail(new HttpError('Account does not exist', 404));

        const result = await bcrypt.compare(password, account.password);

        if (result) return success(new AccountModel(account.id, account.name));
        else return fail(new HttpError('Verification failed', 404));
    } catch (err) {
        return fail(new HttpError('Failed to verify account', 500));
    }
}
