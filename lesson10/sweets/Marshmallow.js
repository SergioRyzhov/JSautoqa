import { Sweet } from './Sweet.js';

export class Marshmallow extends Sweet {
    constructor(title, color, weight) {
        super(title, weight);
        this.color = color;
    }
}