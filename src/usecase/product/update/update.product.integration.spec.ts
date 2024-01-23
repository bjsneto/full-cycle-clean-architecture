import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

    it("should update product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const product = ProductFactory.create("a", "Product 1", 10);
        await productRepository.create(product);

        const output = await useCase.execute({
            id: product.id,
            name: "Product 2",
            price: 20
        });

        expect(output).toEqual({
            id: product.id,
            name: "Product 2",
            price: 20
        });
    });
});