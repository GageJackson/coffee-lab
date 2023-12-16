class AddBookRequest {
    name: string;
    country: string;
    description: string;
    copies: number;
    category: string;
    img?: string;

    constructor(name: string, country: string, description: string, copies: number,
        category: string) {
            this.name = name;
            this.country = country;
            this.description = description;
            this.copies = copies;
            this.category = category;
        }
}

export default AddBookRequest;