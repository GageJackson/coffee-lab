import CoffeeModel from "./CoffeeModel";

class ShelfCurrentLoans {
    coffee: CoffeeModel;
    daysLeft: number;

    constructor(coffee: CoffeeModel, daysLeft: number) {
        this.coffee = coffee;
        this.daysLeft = daysLeft;
    }
}

export default ShelfCurrentLoans;