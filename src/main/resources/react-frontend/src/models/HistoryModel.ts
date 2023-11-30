class HistoryModel {
    id: number;
    userEmail: string;
    checkoutDate: string;
    returnedDate: string;
    name: string;
    country: string;
    description: string;
    img: string;

    constructor(id: number, userEmail: string, checkoutDate: string, returnedDate: string, name: string,
     country: string, description: string, img: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.name = name;
        this.country = country;
        this.description = description;
        this.img = img;
    }
}

export default HistoryModel;