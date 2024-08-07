import { Sweet } from './Sweet.js';

export class Chocolate extends Sweet {
    constructor(title, cacaoPercentage, weight) {
        super(title, weight);
        this.cacaoPercent = cacaoPercentage;
    }
}