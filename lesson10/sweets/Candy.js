import { Sweet } from './Sweet.js';

export class Candy extends Sweet {
    constructor(title, weight, type) {
        super(title, weight);
        this.type = type;
    }
}