class CoffeeModel {
    id: number;
    name: string;
    country: string;
    description: string;
    copies: number;
    copiesAvailable: number;
    category: string;
    img?: string;

    constructor (id: number, name: string, country: string, description: string,
                copies: number, copiesAvailable: number, category: string, img: string) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.img = img;
    }
}

export default CoffeeModel;