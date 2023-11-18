class ReviewRequestModel {
    rating: number;
    coffeeId: number;
    reviewDescription?: string;

    constructor(rating: number, coffeeId: number, reviewDescription: string) {
        this.rating = rating;
        this.coffeeId = coffeeId;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewRequestModel;