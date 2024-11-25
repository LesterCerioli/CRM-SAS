import fs from 'fs';
import path from 'path';
import { logRequest } from './path/to/your/service';  // Adjust the path to your service file

jest.mock('fs');

describe('logRequest Service', () => {
    const originalDateNow = Date.now;

    beforeAll(() => {
        Date.now = jest.fn(() => 1625184000000);  // Mocking Date.now to a fixed timestamp
    });

    afterAll(() => {
        Date.now = originalDateNow;
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    const mockLog = (id) => ({
        id,
        date: '2021-07-02',
        time: '00:00:00:000',
        method: 'GET',
        url: `/test-url-${id}`,
        status: 200,
        duration: '123ms'
    });

    it('should create a new log file and write the first log entry if the file does not exist', () => {
        fs.existsSync.mockReturnValue(false);
        fs.writeFileSync.mockImplementation(() => {});

        logRequest('GET', '/test-url', 200, 123);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            path.join(process.cwd(), 'logs', 'request_logs.json'),
            JSON.stringify([mockLog(1625184000000)], null, 2)
        );
    });

    it('should read existing log file, append the log entry and write back to the file', () => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify([mockLog(1625184000000)]));
        fs.writeFileSync.mockImplementation(() => {});

        const newLog = { ...mockLog(1625184000000), id: 1625184000001 };
        logRequest('POST', '/another-url', 201, 456);

        expect(fs.readFileSync).toHaveBeenCalledWith(path.join(process.cwd(), 'logs', 'request_logs.json'), 'utf-8');
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            path.join(process.cwd(), 'logs', 'request_logs.json'),
            JSON.stringify([mockLog(1625184000000), newLog], null, 2)
        );
    });

    it('should handle generating 40 logs correctly', () => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify([]));
        fs.writeFileSync.mockImplementation(() => {});

        for (let i = 0; i < 40; i++) {
            logRequest('GET', `/test-url-${i}`, 200, 123);
        }

        const expectedLogs = [];
        for (let i = 0; i < 40; i++) {
            expectedLogs.push(mockLog(1625184000000 + i));
        }

        expect(fs.readFileSync).toHaveBeenCalledWith(path.join(process.cwd(), 'logs', 'request_logs.json'), 'utf-8');
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            path.join(process.cwd(), 'logs', 'request_logs.json'),
            JSON.stringify(expectedLogs, null, 2)
        );
    });
});
