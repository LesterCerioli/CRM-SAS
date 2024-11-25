import crypto from 'crypto';

export const PasswordGenerationService = (): string => {
    const password = crypto.randomBytes(16).toString('hex');
    return crypto.createHash('sha256').update(password).digest('hex');
};
