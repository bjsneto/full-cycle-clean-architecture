import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when Id is empty.", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrowError("product: Id is required");
    });

    it("should throw error when name is empty.", () => {
        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrowError("product: Name is required");
    });

    it("should throw error when id and name is empty.", () => {
        expect(() => {
            const product = new Product("", "", 100);
        }).toThrowError("product: Id is required,product: Name is required");
    });

    it("should throw error when price is less than zero.", () => {
        expect(() => {
            const product = new Product("1", "Product 1", -1);
        }).toThrowError("product: Price must be greater than zero");
    });
})