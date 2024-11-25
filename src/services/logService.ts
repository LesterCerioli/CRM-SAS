import fs from 'fs';
import path from 'path';

interface Log {
    id: number;
    date: string;
    time: string;
    method: string;
    url: string;
    status: number;
    duration: string;
}

let logs: Log[] = [];

const formatTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

const formatDate = (): string => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
};

function getFormattedDateTime(): { date: string, time: string } {
    return {
        date: formatDate(),
        time: formatTime()
    };
}

export const logRequest = (method: string, url: string, status: number, duration: number): void => {
    const { date, time } = getFormattedDateTime();
    const logEntry: Log = {
        id: Date.now(),
        date,
        time,
        method,
        url,
        status,
        duration: `${duration}ms`
    };

    logs.push(logEntry);
    console.log("Log Entry:", logEntry);  // Print log entry for debugging

    // Path for JSON file to store logs
    const logFilePath = path.join(process.cwd(), 'logs', 'request_logs.json');

    if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, JSON.stringify([logEntry], null, 2)); // Create JSON file with the first log
    } else {
        const existingLogs = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
        existingLogs.push(logEntry);
        fs.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2)); // Overwrite file with new log
    }

    console.log(`Log registrado: ${method} ${url} - Status: ${status} - Duração: ${duration}ms`);
};
