import jwt from 'jsonwebtoken';

interface TokenData {
    email: string;
    timestamp: number;
}

interface LogDate {
    date: string;
    startHour: string;
    endHour: string;
    duration: number;
    status: string;

}

const generateResetToken = async (email: string) => {
    let attemptCount = 0;
    
    const tokenData: TokenData = {
        email,
        timestamp: Date.now(),
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
        expiresIn: "10m",
    });

    return token;
}