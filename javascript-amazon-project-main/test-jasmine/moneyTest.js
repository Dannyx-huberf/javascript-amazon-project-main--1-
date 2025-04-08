import {formatCurrency} from '../script/utils/money.js';

describe('formatCurrency', () => {
    it('should format a number as currency', () => {
        expect(formatCurrency(1234)).toBe('12.34');
    });

    it('should format a negative number as currency', () => {
        expect(formatCurrency(-1234)).toBe('-12.34');
    });

    it('should format zero as currency', () => {
        expect(formatCurrency(0)).toBe('0.00');
    });

    it('should handle large numbers', () => {
        expect(formatCurrency(1234567890)).toBe('12345678.90');
    });
})