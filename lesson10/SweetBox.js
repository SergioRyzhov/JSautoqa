import { Sweet } from './sweets/Sweet.js';

export class SweetBox {
    constructor() {
        this.sweets = [];
        this.weight = 0;
    }

    addSweet(sweet) {
        this.sweets.push(sweet);
        this.weight += sweet.weight;
    }

    sortSweets(param) {
        if (param === "title") {
            this.sweets.sort((a, b) => a.title.localeCompare(b.title));
        } else if (param === "weight") {
            this.sweets.sort((a, b) => a.weight - b.weight);
        }
    }

    searchSweets(params) {
        return this.sweets.filter(item => {
            const titleMatches = item.title.indexOf(params.title) !== -1;
            const weightMatches = item.weight >= params.weight.min && item.weight <= params.weight.max;
            return titleMatches && weightMatches;
        });
    }
}