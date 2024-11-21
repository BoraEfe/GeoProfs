import { getTodayDate } from './Ziekmelden.jsx';

describe('getTodayDate function', () => {
    it('should return today\'s date in YYYY-MM-DD format', () => {
        const today = new Date();
        const expectedYear = today.getFullYear();
        const expectedMonth = String(today.getMonth() + 1).padStart(2, '0');
        const expectedDay = String(today.getDate()).padStart(2, '0');
        const expectedDate = `${expectedYear}-${expectedMonth}-${expectedDay}`;

        expect(getTodayDate()).toBe(expectedDate);
    });
});