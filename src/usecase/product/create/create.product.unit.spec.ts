import CreateProductUseCase from "./create.product.usecase";

const input1 = {
    name: "Product 1",
    price: 10,
    type: "a"
};

const input2 = {
    name: "Product 2",
    price: -10,
    type: "b"
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};


describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const output = await productCreateUseCase.execute(input1);
        expect(output).toEqual({
            id: expect.any(String),
            name: input1.name,
            price: input1.price
        });
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input1.name = "";
        await expect(productCreateUseCase.execute(input1)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should generate an error when the price is less than zero", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        await expect(productCreateUseCase.execute(input2)).rejects.toThrow(
            "Price must be greater than zero",
        );
    });
});