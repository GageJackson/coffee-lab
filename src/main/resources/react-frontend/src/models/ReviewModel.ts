class ReviewModel {
    id: number;
    userEmail: string;
    date: string;
    rating: number;
    coffeeId: number;
    reviewDescription?: string;

    constructor( id: number, userEmail: string, date: string,
                 rating: number, coffeeId: number, reviewDescription: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.date = date;
        this.rating = rating;
        this.coffeeId = coffeeId;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewModel;