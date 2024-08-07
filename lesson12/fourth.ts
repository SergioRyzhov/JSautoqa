type Mapper<T, U> = (item: T) => U;

export function map<T, U>(mapper: Mapper<T, U>, input: T[]): U[];
export function map<T, U>(mapper: Mapper<T, U>): (input: T[]) => U[];
export function map<T, U>(): typeof map;

export function map<T, U>(mapper?: Mapper<T, U>, input?: T[]): U[] | ((input: T[]) => U[]) | typeof map {
    if (arguments.length === 0) {
        return map;
    }
    if (arguments.length === 1) {
        return function subFunction(subInput?: T[]): U[] | typeof subFunction {
            if (arguments.length === 0) {
                return subFunction;
            }
            return subInput!.map(mapper!);
        } as (input: T[]) => U[];
    }
    return input!.map(mapper!);
}

type Filterer<T> = (item: T) => boolean;

export function filter<T>(filterer: Filterer<T>, input: T[]): T[];
export function filter<T>(filterer: Filterer<T>): (input: T[]) => T[];
export function filter<T>(): typeof filter;

export function filter<T>(filterer?: Filterer<T>, input?: T[]): T[] | ((input: T[]) => T[]) | typeof filter {
    if (arguments.length === 0) {
        return filter;
    }

    if (arguments.length === 1) {
        return function subFunction(subInput?: T[]): T[] | typeof subFunction {
            if (arguments.length === 0) {
                return subFunction;
            }
            return subInput!.filter(filterer!);
        } as (input: T[]) => T[];
    }
        return input!.filter(filterer!);
}

export function add(a: number, b: number): number;
export function add(a: number): (b: number) => number;
export function add(): typeof add;

export function add(a?: number, b?: number): number | ((b: number) => number) | typeof add {
    if (arguments.length === 0) {
        return add;
    }

    if (arguments.length === 1) {
        return function subFunction(subB: number): number | typeof subFunction {
            if (arguments.length === 0) {
                return subFunction;
            }
            return a! + subB;
        } as (b: number) => number;
    }
    return a! + b!;
}