
export class ObjectManipulator<T extends object>{

    constructor(protected obj:T) {}

    public set<K extends keyof T>(key: K, value: T[K]) {
        return new ObjectManipulator({...this.obj, [key]: value} as T);
    }

    public get<K extends keyof T>(key: K): T[K] {
        return this.obj[key];
    }

    public delete<K extends keyof T>(key: K) {
        const newObj = {...this.obj} as T;
        delete newObj[key];
        return new ObjectManipulator(newObj as T);
    }

    public getObject(): T {
        return this.obj;
    }
}