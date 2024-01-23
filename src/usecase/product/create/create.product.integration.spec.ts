import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto } from "./create.product.dto";

const product1: InputCreateProductDto = {
    name: "Product 1",
    price: 100,
    type: "a",
  }
  
  const product2: InputCreateProductDto = {
    name: "Product 2",
    price: 100,
    type: "c",
  }

describe("Integration create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true,
            },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute(product1);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 100
        });
    });

    it("should generate an error product type not supported", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        await expect(productCreateUseCase.execute(product2)).rejects.toThrow(
            "Product type not supported",
        );
    });
});