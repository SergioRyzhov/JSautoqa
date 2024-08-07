import { Candy } from './sweets/Candy.js';
import { Chocolate } from './sweets/Chocolate.js';
import { Marshmallow } from './sweets/Marshmallow.js';
import { SweetBox } from './SweetBox.js';

const candy1 = new Candy("RedCandy", 11, "chocolate");
const candy2 = new Candy("BlueCandy", 11.5, "milk");
const candy3 = new Candy("GreenCandy", 11.2, "nuts");

const chocolate1 = new Chocolate("FlatChocolate", 75, 90);
const chocolate2 = new Chocolate("BubleChocolate", 40, 95);

const marshmallow1 = new Marshmallow("BrestMarsh", "Pink", 10.3);
const marshmallow2 = new Marshmallow("GomelMarsh", "White", 8.1);

const kidPresent1 = new SweetBox();

console.log(kidPresent1);

kidPresent1.addSweet(candy1);
kidPresent1.addSweet(candy1);
kidPresent1.addSweet(candy2);
kidPresent1.addSweet(marshmallow1);
kidPresent1.addSweet(marshmallow2);

console.log(kidPresent1);

kidPresent1.sortSweets("weight");

console.log(kidPresent1);

kidPresent1.sortSweets("title");

console.log(kidPresent1);

console.log(kidPresent1.searchSweets({title: "Candy", weight: {min: 10, max: 11.5}}));