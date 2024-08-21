//@ts-expect-error // eslint-disable-line @typescript-eslint/ban-ts-comment
import Calculator from "../src/calculator";

describe('Calculator class functionality', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('Add functionality', () => {
        test('Must return a sum of the two numbers', async () => {
            const result = await calculator.add(1, 2);
            expect(result).toBe(3);
            expect(result).not.toBe(0);
        });

        test('Must return a sum of the three numbers', async () => {
            const result = await calculator.add(1, 2, 3);
            expect(result).toBe(6);
            expect(result).not.toBe(0);
        });

        test('Must return a sum of a negative and a positive number', async () => {
            const result = await calculator.add(-1, 2);
            expect(result).toBe(1);
            expect(result).not.toBe(0);
        });

        test('Must be zero if we are not passing arguments', async () => {
            const result = await calculator.add();
            expect(result).toBe(0);
            expect(result).not.toBe(1);
        });
        
        test('Must be the same number if the second arg is 0', async () => {
            const result = await calculator.add(5, 0);
            expect(result).toBe(5);
            expect(result).not.toBe(0);
        });
    });

    describe('Subtract functionality', () => {
        test('Must return a difference of two numbers', async () => {
            const result = await calculator.subtraction(3, 1);
            expect(result).toBe(2);
            expect(result).not.toBe(0);
        });

        test('Must return a subtraction of two args if we are passing more than two args', async () => {
            const result = await calculator.subtraction(3, 1, 1);
            expect(result).toBe(2);
            expect(result).not.toBe(0);
        });

        test('Must return a negative difference of two negative numbers', async () => {
            const result = await calculator.subtraction(-6, -2);
            expect(result).toBe(-4);
            expect(result).not.toBe(0);
        });

        test('Must be NaN if we are not passing arguments', async () => {
            const result = await calculator.subtraction();
            expect(result).toBeNaN();
            expect(result).not.toBe(0);
        });

        test('Must be the same number if the second arg is 0', async () => {
            const result = await calculator.subtraction(5, 0);
            expect(result).toBe(5);
            expect(result).not.toBe(0);
        });
    });

    describe('Multiply functionality', () => {
        test('Must return the multiplied result of two numbers', async () => {
            const result = await calculator.multiply(3, 6);
            expect(result).toBe(18);
            expect(result).not.toBe(0);
        });

        test('Must return the multiplied result of three numbers', async () => {
            const result = await calculator.multiply(2, 2, 3);
            expect(result).toBe(12);
            expect(result).not.toBe(0);
        });

        test('Must be zero if the second arg is 0', async () => {
            const result = await calculator.multiply(5, 0);
            expect(result).toBe(0);
            expect(result).not.toBe(5);
        });

        test('Must return a product of a negative and a positive number', async () => {
            const result = await calculator.multiply(-1, 2);
            expect(result).toBe(-2);
            expect(result).not.toBe(1);
        });

        test('Must return 1 if no arguments are passed', async () => {
            const result = await calculator.multiply();
            expect(result).toBe(1);
            expect(result).not.toBe(0);
            expect(result).not.toBeNaN();
        });

        test('Must return the same number if the second arg is 1', async () => {
            const result = await calculator.multiply(5, 1);
            expect(result).toBe(5);
            expect(result).not.toBe(0);
        });
    });

    describe('Divide functionality', () => {
        test('Must return the divided result', async () => {
            const result = await calculator.divide(6, 2);
            expect(result).toBe(3);
            expect(result).not.toBe(0);
        });

        test('Must return the divided result if the second arg is negative', async () => {
            const result = await calculator.divide(6, -2);
            expect(result).toBe(-3);
            expect(result).not.toBe(0);
        });

        test('Must return the same number if the second argument is 1', async () => {
            const result = await calculator.divide(6, 1);
            expect(result).toBe(6);
            expect(result).not.toBe(5);
        });

        test('Must be Infinity if dividing by 0', async () => {
            const result = await calculator.divide(5, 0);
            expect(result).toBe(Infinity);
            expect(result).not.toBe(0);
            expect(result).not.toBeNaN();
        });

        test('Must be NaN if no arguments are passed', async () => {
            const result = await calculator.divide();
            expect(result).toBeNaN();
            expect(result).not.toBe(0);
        });
    });
    
    describe('Exponentiation functionality', () => {
        test('Must return the square of the arg', async () => {
            const result = await calculator.exponentiation(3);
            expect(result).toBe(9);
            expect(result).not.toBe(0);
        });

        test('Must return the square of a negative arg', async () => {
            const result = await calculator.exponentiation(-3);
            expect(result).toBe(9);
            expect(result).not.toBe(0);
        });

        test('Must return the square of the first arg if more than one were passed', async () => {
            const result = await calculator.exponentiation(3, 4);
            expect(result).toBe(9);
            expect(result).not.toBe(16);
        });

        test('Must return NaN if no args are passed', async () => {
            const result = await calculator.exponentiation();
            expect(result).toBeNaN();
            expect(result).not.toBe(0);
        });

        test('Must return 0 if the arg is 0', async () => {
            const result = await calculator.exponentiation(0);
            expect(result).toBe(0);
            expect(result).not.toBeNaN();
        });
    });
});